import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService {
    private baseUrl = 'https://book-store-client-sable.vercel.app'; // ✅ Change to your backend URL

    constructor(private http: HttpClient, private router: Router) { }


    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/users/admin_login/`, { username, password }, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    // console.log("✅ Token Stored:", localStorage.getItem('token'));

                    // **Set Automatic Logout Timer**
                    const expirationTime = 3600 * 1000; // 1 hour
                    setTimeout(() => {
                        this.handleSessionExpiry();
                    }, expirationTime);
                }
            })
        );
    }

    // ✅ **New Function for Session Expiry Handling**
    handleSessionExpiry(): void {
        Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            confirmButtonText: "OK"
        }).then(() => {
            this.logout();  // ✅ Auto Logout
        });
    }

    // ✅ **Logout Function**
    logout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']); // ✅ Redirect to login
    }


    // ✅ Check if Admin is Authenticated
    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    // ✅ Get JWT Token
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getAdminStats(): Observable<any> {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

        return this.http.get<any>(`${this.baseUrl}/stats/stats`, { headers });
    }
}
