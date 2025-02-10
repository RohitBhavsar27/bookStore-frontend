import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ActivatedRoute } from '@angular/router';
import { TopSalesComponent } from './top-sales/top-sales.component';
import { recommendedComponent } from './recommended/recommended.component';
import { NewsComponent } from './news/news.component';

@Component({
    selector: 'app-home',
    imports: [BannerComponent, recommendedComponent,NewsComponent, TopSalesComponent,],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {

    constructor(private activatedroute: ActivatedRoute){
        
    }

}
