import { Injectable, inject } from '@angular/core';
import {
    Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword,
    User, GoogleAuthProvider, signInWithPopup, onAuthStateChanged
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth = inject(Auth);
    private currentUserSubject = new BehaviorSubject<User | null>(null); // ✅ Stores current user state
    currentUser$ = this.currentUserSubject.asObservable(); // ✅ Observable for navbar

    constructor() {
        this.trackUserState(); // ✅ Track user state on app load
    }

    // ✅ **Register User**
    registerUser(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            createUserWithEmailAndPassword(this.auth, email, password)
                .then(userCredential => {
                    this.setUser(userCredential.user);
                    observer.next(userCredential);
                })
                .catch(error => observer.error(error));
        });
    }

    // ✅ **Login User**
    loginUser(email: string, password: string): Observable<any> {
        return new Observable(observer => {
            signInWithEmailAndPassword(this.auth, email, password)
                .then(userCredential => {
                    this.setUser(userCredential.user);
                    observer.next(userCredential);
                })
                .catch(error => observer.error(error));
        });
    }

    // ✅ **Google Sign-in**
    signInWithGoogle(): Observable<any> {
        return new Observable(observer => {
            signInWithPopup(this.auth, new GoogleAuthProvider())
                .then(userCredential => {
                    this.setUser(userCredential.user);
                    observer.next(userCredential);
                })
                .catch(error => observer.error(error));
        });
    }

    // ✅ **Check if User is Authenticated**
    isAuthenticated(): boolean {
        return !!localStorage.getItem('currentUser');
    }

    // ✅ **Logout**
    logout(): Observable<void> {
        return new Observable(observer => {
            signOut(this.auth)
                .then(() => {
                    localStorage.removeItem('currentUser'); // ✅ Clear local storage
                    this.currentUserSubject.next(null); // ✅ Reset BehaviorSubject
                    observer.next();
                })
                .catch(error => observer.error(error));
        });
    }

    // ✅ **Track Authentication State**
    private trackUserState(): void {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.setUser(user);
            } else {
                localStorage.removeItem('currentUser'); // ✅ Clear local storage
                this.currentUserSubject.next(null);
            }
        });
    }

    // ✅ **Set User in BehaviorSubject & LocalStorage**
    private setUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user); // ✅ Update BehaviorSubject
    }

    // ✅ **Get Current User as Observable**
    getCurrentUser(): Observable<User | null> {
        return this.currentUser$;
    }
}
