import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
    faBarsStaggered,
    faHeart,
    faMagnifyingGlass,
    faShoppingCart,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../Services/auth.service';
import { selectCartItems } from '../../../ngrx-state/cartStates/cart.selectors';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [FontAwesomeModule, RouterLink, CommonModule]
})
export class NavbarComponent implements OnInit {
    barIcon = faBarsStaggered;
    searchIcon = faMagnifyingGlass;
    heartIcon = faHeart;
    cartIcon = faShoppingCart;
    userIcon = faUser;
    currentUser: any = null;
    avatarPath: string = 'assets/avatar.png'; // Default avatar
    userPhoto: string | null = null;
    isDropdownOpen: boolean = false;

    cartCount$: Observable<number>;

    // ✅ **Fix: Define `navigation` array**
    navigation = [
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Orders', href: '/orders' },
        { name: 'Cart Page', href: '/cart' },
        { name: 'Check Out', href: '/checkout' },
    ];

    constructor(
        private store: Store,
        private authService: AuthService,
        private router: Router,
        private elementRef: ElementRef
    ) {
        this.cartCount$ = this.store.select(selectCartItems).pipe(map(items => items.length));
    }

    ngOnInit(): void {
        // ✅ Subscribe to user changes (real-time updates)
        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            this.userPhoto = user?.photoURL || null;
            // console.log("✅ Navbar User Data Updated:", this.currentUser);
            // console.log("✅ User Photo URL:", this.userPhoto);
        });

        this.router.events.subscribe(() => {
            this.isDropdownOpen = false; // Close dropdown on navigation
        });
    }


    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isDropdownOpen = false;
        }
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: () => {
                this.isDropdownOpen = false;
                this.router.navigate(['/login']);
            },
            error: (error) => console.error('Logout failed:', error),
        });
    }
}
