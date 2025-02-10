import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FetchDataService {
    private users_jsonFilePath = 'data/users.json'; // Path to your JSON file

    private baseUrl = 'http://127.0.0.1:8000/news';

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    }

    constructor(private httpClient: HttpClient) { }

    getNewsData(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.baseUrl}/getNewsData`, { headers: this.getHeaders() });
    }

    getUsersData(): Observable<any> {
        return this.httpClient.get(this.users_jsonFilePath, { headers: this.getHeaders() });
    }
}
