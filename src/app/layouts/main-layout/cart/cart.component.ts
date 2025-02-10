import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../ngrx-state/cartStates/cart.model';
import { selectCartItems } from '../../../ngrx-state/cartStates/cart.selectors';
import { clearCart, removeFromCart } from '../../../ngrx-state/cartStates/cart.actions';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    imports: [NgForOf, NgIf, AsyncPipe, RouterLink],
    styleUrls: ['./cart.component.css'],
})
export class CartComponent {
    cartItems$: Observable<CartItem[]>;
    totalPrice$: Observable<number>;

    constructor(private store: Store) {
        // Select cart items from the store
        this.cartItems$ = this.store.select(selectCartItems);

        // Calculate total price from cart items
        this.totalPrice$ = this.store
            .select(selectCartItems)
            .pipe(
                map((items: CartItem[]) =>
                    items.reduce(
                        (acc: number, item: CartItem) =>
                            acc + item.price * (item.quantity || 1),
                        0
                    )
                )
            );
    }

    onRemoveFromCart(id: string): void {
        this.store.dispatch(removeFromCart({ id }));
    }

    onClearCart(): void {
        this.store.dispatch(clearCart());
    }
}
