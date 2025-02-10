import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-revenue-chart',
    templateUrl: './revenue-chart.component.html',
    standalone: true,
    imports: [BaseChartDirective],
})
export class RevenueChartComponent {
    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true, // Keeps the aspect ratio fixed
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Revenue',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public barChartType: ChartType = 'bar';

    public barChartData: ChartConfiguration['data'] = {
        labels: this.barChartLabels,
        datasets: [
            {
                label: 'Revenue (USD)',
                data: [500, 700, 800, 600, 750, 900, 650, 870, 960, 1020, 1100, 1150],
                backgroundColor: 'rgba(34, 197, 94, 0.7)',
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 1,
            },
        ],
    };
}
