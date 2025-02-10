import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BookService } from '../../../../../Services/book.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css'],
    imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class AddBookComponent {
    addBookForm: FormGroup;
    imageFile: File | null = null;
    imageFileName: string = '';

    constructor(private fb: FormBuilder, private bookService: BookService) {
        this.addBookForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
            trending: [false],
            oldPrice: ['', [Validators.required, Validators.min(0)]],
            newPrice: ['', [Validators.required, Validators.min(0)]],
            coverImage: [''],
        });
    }

    // Handle file input change
    handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.imageFile = input.files[0];
            this.imageFileName = this.imageFile.name;
        }
    }

    // Handle form submission
    async onSubmit() {
        if (this.addBookForm.invalid) {
            Swal.fire('Error', 'Please fill all required fields.', 'error');
            return;
        }

        const formData = { ...this.addBookForm.value, coverImage: this.imageFileName };

        try {
            await this.bookService.addBook(formData).toPromise();
            Swal.fire('Success', 'Book added successfully!', 'success');
            this.addBookForm.reset();
            this.imageFileName = '';
            this.imageFile = null;
        } catch (error) {
            Swal.fire('Error', 'Failed to add book. Please try again.', 'error');
        }
    }
}
