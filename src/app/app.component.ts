import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { setLogLevel, LogLevel } from "@angular/fire";
import { LoadingComponent } from './loading/loading.component';
setLogLevel(LogLevel.VERBOSE);

@Component({
    selector: 'app-root',
    imports: [FormsModule, CommonModule, RouterOutlet, LoadingComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'book-store-client';

    loading: boolean = true;
    ngOnInit() {
        setTimeout(() => {
            this.loading = false;
        }, 2000); // Simulate loading effect for 2 seconds

        const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (savedUser) {
            // console.log("✅ User restored from localStorage:", savedUser);
        }
    }
}
