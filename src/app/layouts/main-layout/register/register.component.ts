import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from '../../../Services/auth.service';


@Component({
    selector: 'app-register',
    imports: [FormsModule, CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterLink,],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
    myRegistrationForm!: FormGroup;
    message: string = '';
    googleIcon = faGoogle;
    authService = inject(AuthService);
    router = inject(Router)
    fb = inject(FormBuilder)
    errorMessage: string | null = null;
    // constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.myRegistrationForm = this.fb.group({
            // name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    onSubmit(): void {
        if (this.myRegistrationForm.invalid) {
            this.message = 'Please provide valid email and password!';
            return;
        }

        const { email, password } = this.myRegistrationForm.value;

        this.authService.registerUser(email, password).subscribe({
            next: () => {
                Swal.fire({
                    title: "Sign Up Successful!",
                    text: "Your account has been created successfully.",
                    icon: "success",
                    timer: 2000, // ✅ Auto-close after 2 seconds
                    showConfirmButton: false
                });
                this.router.navigate(['/login']);
            },
            error: (error) => {
                Swal.fire({
                    title: "Sign Up Failed",
                    text: "Something went wrong! Please try again.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
                console.error(error);
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
