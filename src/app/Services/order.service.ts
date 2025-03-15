import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) { }

    newOrder(order: Order): Observable<any> {
        return this.httpClient.post<any>("https://book-store-backend-ompg.vercel.app/orders/newOrder/", order).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

    getOrdersByEmail(email: string): Observable<{ orders: any[] }> {  // ✅ Expect an object, not an array
        return this.httpClient.get<{ orders: any[] }>(`https://book-store-backend-ompg.vercel.app/orders/getOrder/${email}`).pipe(
            catchError(error => {
                console.error("❌ Error fetching orders:", error);
                return throwError(() => new Error("Failed to fetch orders."));
            })
        );
    }


}
interface Address {
    street: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
}

interface Order {
    name: string;
    email: string;
    phone: string;
    address: Address;
    productIds: string[];
    totalPrice: number;
}
