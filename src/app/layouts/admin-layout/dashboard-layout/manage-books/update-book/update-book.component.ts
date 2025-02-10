import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BookService } from '../../../../../Services/book.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-update-book',
    templateUrl: './update-book.component.html',
    styleUrls: ['./update-book.component.css'],
    imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class UpdateBookComponent implements OnInit {
    updateBookForm: FormGroup;
    bookId: string | null = null;
    bookData: any;
    isLoading = true;
    isError = false;

    categories = [
        { value: '', label: 'Choose A Category' },
        { value: 'business', label: 'Business' },
        { value: 'technology', label: 'Technology' },
        { value: 'fiction', label: 'Fiction' },
        { value: 'horror', label: 'Horror' },
        { value: 'adventure', label: 'Adventure' },
    ];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService
    ) {
        this.updateBookForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            category: [''], // Default to empty value
            trending: [false],
            oldPrice: ['', [Validators.required, Validators.min(0)]],
            newPrice: ['', [Validators.required, Validators.min(0)]],
            coverImage: [''],
        });
    }

    ngOnInit() {
        this.bookId = this.route.snapshot.paramMap.get('id');
        if (this.bookId) {
            this.fetchBookData();
        }
    }

    fetchBookData() {
        this.bookService.getBook(this.bookId!).subscribe(
            (data) => {
                this.bookData = data;

                // Set form values
                this.updateBookForm.patchValue({
                    title: data.title,
                    description: data.description,
                    category: this.categories.some(cat => cat.value === data.category) ? data.category : '',
                    trending: data.trending,
                    oldPrice: data.oldPrice,
                    newPrice: data.newPrice,
                    coverImage: data.coverImage,
                });
                this.isLoading = false;
            },
            (error) => {
                this.isError = true;
                this.isLoading = false;
                console.error('Error fetching book data:', error);
            }
        );
    }

    onSubmit() {
        if (this.updateBookForm.invalid) {
            Swal.fire('Error', 'Please fill all required fields.', 'error');
            return;
        }

        const updatedBookData = {
            ...this.updateBookForm.value,
        };

        this.bookService.updateBook(this.bookId!, updatedBookData).subscribe(
            () => {
                Swal.fire('Success', 'Book updated successfully!', 'success');
            },
            (error) => {
                Swal.fire('Error', 'Failed to update book.', 'error');
                console.error(error);
            }
        );
    }
}
