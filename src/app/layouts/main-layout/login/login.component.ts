import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/auth.service';



@Component({
    selector: 'app-login',
    imports: [FormsModule, CommonModule, RouterLink, FontAwesomeModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    message: string = ""
    googleIcon = faGoogle
    myLoginForm!: FormGroup;
    authService = inject(AuthService);
    router = inject(Router)
    fb = inject(FormBuilder)
    errorMessage: string | null = null;

    // constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.myLoginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }


    onSubmit(): void {
        if (this.myLoginForm.invalid) {
            this.message = 'Please provide valid email and password.';
            return;
        }

        const { email, password } = this.myLoginForm.value;

        this.authService.loginUser(email, password).subscribe({
            next: (userCredential) => {
                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome!",
                    icon: "success",
                    timer: 2000, // ✅ Auto-close after 2 seconds
                    showConfirmButton: false
                });

                this.router.navigate(['/home']);  // ✅ Redirect after login
                // console.log("✅ User logged in:", userCredential.user);
            },
            error: (error) => {
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                console.error("❌ Login failed:", error);
            }
        });
    }

    handleGoogleSignIn(): void {
        this.authService.signInWithGoogle().subscribe({
            next: () => {
                Swal.fire({
                    title: "Google Sign-In Successful!",
                    text: "Welcome!",
                    icon: "success",
                    timer: 2000, // ✅ Auto-close after 2 seconds
                    showConfirmButton: false
                });

                this.router.navigate(['/']);
            },
            error: (error) => {
                Swal.fire({
                    title: "Google Sign-In Failed",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                console.error(error);
            }
        });
    }
}
