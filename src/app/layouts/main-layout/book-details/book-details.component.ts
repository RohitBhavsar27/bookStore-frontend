import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../../ngrx-state/bookStates/books.model';
import { BookService } from '../../../Services/book.service';
import { CartItem } from '../../../ngrx-state/cartStates/cart.model';
import { addToCart } from '../../../ngrx-state/cartStates/cart.actions';


@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css'],
    imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class BookDetailsComponent implements OnInit {
    bookId!: string;
    book$!: Observable<Book>;
    isLoading = true;
    isError = false;
    shoppingCartIcon = faShoppingCart;

    constructor(
        private route: ActivatedRoute,
        private bookService: BookService,
        private store: Store
    ) { }

    ngOnInit(): void {
        this.bookId = this.route.snapshot.paramMap.get('id') || '';
        if (this.bookId) {
            this.book$ = this.bookService.getBook(this.bookId);
            this.book$.subscribe({
                next: (book) => {
                    this.isLoading = false;
                    // console.log(book);
                },
                error: (e) => {
                    this.isError = true;
                    console.log(e);
                },
                complete: () => console.log('Book fetched successfully')
            });
        }
    }

    getBookImgUrl(name: string): string {
        return `assets/books/${name}`;
    }

    addBookToCart(book: Book): void {
        const cartItem: CartItem = {
            _id: book._id.toString(),
            name: book.title,
            price: book.newPrice,
            quantity: 1,
            category: book.category,
            coverImage: book.coverImage
        };
        this.store.dispatch(addToCart({ item: cartItem }));
    }
}
