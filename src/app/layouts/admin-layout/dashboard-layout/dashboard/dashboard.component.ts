import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminAuthService } from '../../../../Services/admin-auth.service';
import { RevenueChartComponent } from '../revenue-chart/revenue-chart.component';
import { FetchDataService } from '../../../../Services/fetch-data.service';

@Component({
    selector: 'app-dashboard',
    imports: [MatIconModule, CommonModule, RevenueChartComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
    data: any = {}; // Store fetched data
    loading: boolean = true; // For loading indicator
    errorMessage: string = ''; // For error handling
    users: any[] = []

    constructor(private adminAuthService: AdminAuthService, private fetchDataService: FetchDataService) { }

    ngOnInit(): void {
        this.fetchAdminStats();

        this.fetchDataService.getUsersData().subscribe({
            next: (response) => {
                this.users = response;
                // console.log(this.users);
            },
            error: (e) => {
                console.error('Error fetching news data:', e);
                this.errorMessage = 'Failed to fetch news data';
            },
            complete: () => console.log('Successfully fetched news data'),
        });
    }

    fetchAdminStats(): void {
        this.adminAuthService.getAdminStats().subscribe(
            (response) => {
                this.data = response; // Assign fetched data
                console.log(this.data);
                this.loading = false; // Turn off loading
            },
            (error) => {
                console.error('Error fetching admin stats:', error);
                this.errorMessage = 'Failed to fetch admin stats';
                this.loading = false; // Turn off loading even in case of error
            }
        );
    }
}
