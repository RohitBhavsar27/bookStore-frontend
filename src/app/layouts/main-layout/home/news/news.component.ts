import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle'
import { Navigation, Pagination } from 'swiper/modules';
import { FetchDataService } from '../../../../Services/fetch-data.service';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

@Component({
    selector: 'app-news',
    imports: [FormsModule, CommonModule,],
    templateUrl: './news.component.html',
    styleUrl: './news.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsComponent {

    data: any[] = []
    newsData: any[] = []
    imgName: string = ""
    url: string = ""
    item: any = ""

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

    constructor(private fetchDataService: FetchDataService) {

    }

    ngOnInit(): void {
        this.fetchDataService.getNewsData().subscribe({
            next: (response) => {
                this.data = response;
                this.newsData = this.data; // Show all books by default
                // console.log(this.data);
            },
            error: (e) => console.log(e),
            complete: () => console.log('success'),
        });
    }

    @Input() news!: { id: number, title: string, description: string, image: string; }

    getNewsImgUrl(imgName: string,): string {
        return `assets/news/${imgName}`;
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
    }
    pagination = {
        clickable: true
    }
}
