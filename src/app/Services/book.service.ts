import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../ngrx-state/bookStates/books.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private baseUrl = 'https://book-store-backend-ompg.vercel.app/books';

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    }

    getAllBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseUrl}/getAllBooks`);
    }

    getBook(id: string): Observable<Book> {
        return this.http.get<Book>(`${this.baseUrl}/getBook/${id}`);
    }

    addBook(newBook: Book): Observable<Book> {
        return this.http.post<Book>(`${this.baseUrl}/addBook/`, newBook, { headers: this.getHeaders() });
    }

    updateBook(id: string, updatedBook: Partial<Book>): Observable<Book> {
        return this.http.put<Book>(`${this.baseUrl}/updateBook/${id}`, updatedBook, { headers: this.getHeaders().set('Content-Type', 'application/json') });
    }

    deleteBook(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deleteBook/${id}`, { headers: this.getHeaders() });
    }
}

