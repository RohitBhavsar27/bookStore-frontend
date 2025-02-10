import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, MatIconModule, RouterLink],
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

    constructor(private router: Router) { }

    handleLogout(): void {
        localStorage.removeItem('token'); // Clear the token
        this.router.navigate(['/']); // Navigate to home or login page
    }
}
