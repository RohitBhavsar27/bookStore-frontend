import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { FetchDataService } from '../../app/fetch-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle'
import { Navigation, Pagination } from 'swiper/modules';
import { BookCardComponent } from '../book-card/book-card.component';
import { BookService } from '../../../../Services/book.service';


@Component({
    selector: 'app-recommended',
    imports: [CommonModule, FormsModule, BookCardComponent,],
    templateUrl: './recommended.component.html',
    styleUrl: './recommended.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class recommendedComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        // Register Swiper Elements
        register();

        const swiperEl = document.querySelector('swiper-container') as any;

        const params = {
            modules: [Navigation, Pagination],
            injectStylesUrls: [
                'node_modules/swiper/navigation-element.min.css',
                'node_modules/swiper/pagination-element.min.css'
            ]
        };

        Object.assign(swiperEl, params);
        swiperEl.initialize();
    }

    data: any[] = [];
    filteredBooks: any[] = [];
    categories: string[] = ['Choose a genre', 'Business', 'Fiction', 'Horror', 'Adventure']
    selected: string = this.categories[0]

    constructor(private bookService: BookService) {

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
    pagination = {
        clickable: true
    }

}
