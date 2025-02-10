import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartItem } from '../../../ngrx-state/cartStates/cart.model';
import { AuthService } from '../../../Services/auth.service';
import { OrderService } from '../../../Services/order.service';
import { selectCartItems } from '../../../ngrx-state/cartStates/cart.selectors';


@Component({
    selector: 'app-checkout',
    imports: [AsyncPipe, ReactiveFormsModule, FormsModule, CommonModule,],
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    totalPrice$: Observable<number>;
    cartItems$: Observable<CartItem[]>;
    cartItemIds$: Observable<string[]>;
    cartCount$: Observable<number>;
    currentUser: any = true;
    myCheckoutForm!: FormGroup;
    submitted: boolean = false;
    userEmail: string | null = null;

    constructor(
        private store: Store,
        private fb: FormBuilder,
        private authService: AuthService,
        private orderService: OrderService,
        private router: Router
    ) {
        this.cartItems$ = this.store.select(selectCartItems);

        this.cartCount$ = this.store.select(selectCartItems).pipe(
            map((items) => items.length)
        );

        this.totalPrice$ = this.store.select(selectCartItems).pipe(
            map((items: CartItem[]) =>
                items.reduce(
                    (acc: number, item: CartItem) =>
                        acc + item.price * (item.quantity || 1),
                    0
                )
            )
        );

        this.cartItemIds$ = this.cartItems$.pipe(
            map((items: CartItem[]) => items.map(item => item._id))
        );
    }

    ngOnInit() {
        this.myCheckoutForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9]{10,15}$/)]],
            address: this.fb.group({
                street: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required],
                state: ['', Validators.required],
                zipcode: ['', Validators.required]
            }),
            acceptTerms: [false, Validators.requiredTrue]
        });

        const user = JSON.parse(localStorage.getItem('currentUser') || '{}'); // Parse the stored user data
        this.userEmail = user?.email || null; // Get the email from the stored user data
        this.myCheckoutForm.patchValue({ email: this.userEmail }); // Set email in form

    }

    get f() {
        return this.myCheckoutForm.controls;
    }

    get addressControls() {
        return (this.myCheckoutForm.get('address') as FormGroup).controls;
    }

    async onSubmit() {
        this.submitted = true;

        if (this.myCheckoutForm.invalid) {
            console.error('Form is invalid', this.myCheckoutForm.errors);
            return;
        }

        try {
            const productIds = await firstValueFrom(this.cartItemIds$);
            const totalPrice = await firstValueFrom(this.totalPrice$);

            const formData = this.myCheckoutForm.value;

            const newOrder = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                productIds: productIds,
                totalPrice: totalPrice,
            };

            // Send the order to the backend
            this.orderService.newOrder(newOrder).subscribe(
                response => {
                    if (response.success) {
                        Swal.fire({
                            title: "Your order has been placed successfully.",
                            icon: "success",
                            draggable: true
                        });
                        this.router.navigate(['/orders']); // Redirect to login if not authenticated
                        this.myCheckoutForm.reset(); // Reset form on success

                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                    }
                },
                error => {
                    console.error("Error placing the order:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
            );

        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    }
}
