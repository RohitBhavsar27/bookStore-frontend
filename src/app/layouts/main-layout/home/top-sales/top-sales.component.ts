import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle'
import { Navigation, Pagination } from 'swiper/modules';
import { Store } from '@ngrx/store';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../../../Services/book.service';

@Component({
    selector: 'app-top-sales',
    imports: [CommonModule, FormsModule, BookCardComponent],
    templateUrl: './top-sales.component.html',
    styleUrl: './top-sales.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TopSalesComponent implements AfterViewInit, OnInit {


    ngAfterViewInit(): void {
        // Register Swiper Elements
        register();

        const swiperEl = document.querySelector('swiper-container') as any;

        const params = {
            modules: [Navigation, Pagination],
            navigation: true,
        };

        Object.assign(swiperEl, params);
        swiperEl.initialize();
    }

    data: any[] = [];
    filteredBooks: any[] = [];
    categories: string[] = ['Choose a genre', 'Business', 'Fiction', 'Horror', 'Adventure']
    selected: string = this.categories[0]

    constructor(private store: Store, private bookService: BookService) {

    }

    ngOnInit(): void {
        this.bookService.getAllBooks().subscribe({
            next: (response) => {
                this.data = response;
                this.filteredBooks = this.data; // Show all books by default
                // console.log(this.data);
            },
            error: (e) => console.log(e),
            complete: () => console.log('success'),
        });
    }

    // books$: Observable<Book[]>;

    // constructor(private store: Store<{ books: BooksState }>) {
    //     this.books$ = store.select(state => state.books.books);
    // }

    // ngOnInit(): void {
    //     this.store.dispatch(BooksActions.fetchAllBooks());
    // }

    getFilteredBooks() {
        this.filteredBooks =
            this.selected === 'Choose a genre'
                ? this.data // Show all books when no genre is selected
                : this.data.filter((book: { category: string }) =>
                    book.category.toLowerCase() === this.selected.toLowerCase()
                );
        console.log(this.filteredBooks);
    }

    breakpoints = {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 50,
        },
        1180: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    }
}
