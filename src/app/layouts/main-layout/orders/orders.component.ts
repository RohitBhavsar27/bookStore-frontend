import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../Services/order.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
    orders: any[] = [];
    isLoading: boolean = true;
    isError: boolean = false;
    userEmail: string | null = null;
    noOrdersMessage: string = '';

    constructor(private orderService: OrderService, private authService: AuthService) { }
    ngOnInit() {
        const storedUser = localStorage.getItem('currentUser');

        if (storedUser) {
            const user = JSON.parse(storedUser);
            this.userEmail = user?.email || null;
            if (this.userEmail) {
                this.fetchOrders(this.userEmail);
            } else {
                this.isLoading = false;
                this.isError = false;
            }
        } else {
            this.isLoading = false;
            this.isError = false;
        }
    }


    fetchOrders(email: string) {
        this.orderService.getOrdersByEmail(email).subscribe({
            next: (response) => {  // ✅ response is now { orders: [...] }
                this.isLoading = false;

                if (!response.orders || response.orders.length === 0) {
                    this.noOrdersMessage = "No orders were found for this account";
                    this.orders = [];
                } else {
                    this.orders = response.orders;
                    this.noOrdersMessage = ''; // ✅ Clear message if orders exist
                }
            },
            error: (error) => {
                console.error("Error fetching orders:", error);
                this.isError = true;
                this.isLoading = false;
                this.orders = []; // ✅ Ensure orders array is empty on error
            }
        });
    }
}
