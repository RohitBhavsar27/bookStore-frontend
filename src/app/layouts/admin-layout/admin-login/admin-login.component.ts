import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../../Services/admin-auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-admin-login',
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    myAdminLoginForm: FormGroup;
    message: string = '';

    constructor(private fb: FormBuilder, private authService: AdminAuthService, private router: Router, private route: ActivatedRoute) {
        this.myAdminLoginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    onSubmit(): void {
        if (this.myAdminLoginForm.invalid) {
            this.message = 'Please enter valid credentials';
            return;
        }

        const { username, password } = this.myAdminLoginForm.value;

        this.authService.login(username, password).subscribe({
            next: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Admin Login successful!",
                    icon: "success",
                    timer: 2000, // ✅ Auto-close after 2 seconds
                    showConfirmButton: false
                });

                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
                this.router.navigateByUrl(returnUrl);
            },
            error: (error) => {
                console.error('Login Error:', error);
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid username or password. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        });
    }
}
