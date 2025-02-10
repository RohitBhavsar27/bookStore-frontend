import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { CartItem } from '../../../../ngrx-state/cartStates/cart.model';
import { addToCart } from '../../../../ngrx-state/cartStates/cart.actions';



@Component({
    selector: 'app-book-card',
    imports: [FontAwesomeModule, CommonModule, RouterLink],
    templateUrl: './book-card.component.html',
    styleUrl: './book-card.component.css'
})
export class BookCardComponent {
    shoppingCartIcon = faShoppingCart;

    // Input to receive book data
    @Input() book!: {
        _id: number,
        title: string,
        description: string,
        category: string,
        trending: boolean,
        coverImage: string,
        oldPrice: number,
        newPrice: number
    };

    constructor(private store: Store) { }

    getBookImgUrl(name: string): string {
        return `assets/books/${name}`;
    }

    addBookToCart(): void {
        const cartItem: CartItem = {
            _id: this.book._id.toString(),
            name: this.book.title,
            price: this.book.newPrice,
            quantity: 1,
            category: this.book.category, // Add category here
            coverImage: this.book.coverImage // Include cover image if needed
        };

        this.store.dispatch(addToCart({ item: cartItem }));
    }

}
