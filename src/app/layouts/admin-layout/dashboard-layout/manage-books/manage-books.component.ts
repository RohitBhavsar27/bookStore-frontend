import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../../Services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-manage-books',
    templateUrl: './manage-books.component.html',
    styleUrls: ['./manage-books.component.css'],
    imports: [FormsModule, CommonModule]
})
export class ManageBooksComponent implements OnInit {
    books: any[] = [];
    isLoading = true;
    isError = false;

    constructor(private booksService: BookService, private router: Router) { }

    ngOnInit(): void {
        this.loadBooks();
    }

    loadBooks(): void {
        this.booksService.getAllBooks().subscribe({
            next: (data) => {
                this.books = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to fetch books:', err); // ✅ Console logs should be inside error callback
                this.isError = true;
                this.isLoading = false;
            },
            complete: () => {
                // console.log('Book fetching completed'); // ✅ Optional: Log when request completes
            }
        });
    }



    handleDeleteBook(id: string): void {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) { // ✅ If user confirms delete
                this.booksService.deleteBook(id).subscribe({
                    next: () => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Book has been deleted successfully.",
                            icon: "success"
                        });
                        this.loadBooks(); // ✅ Refetch books after successful deletion
                    },
                    error: (err) => {
                        console.error('Failed to delete book:', err);
                        Swal.fire({
                            title: "Error",
                            text: "Failed to delete book. Please try again.",
                            icon: "error"
                        });
                    },
                });
            }
        });
    }


    handleEditClick(id: string): void {
        this.router.navigate([`/admin/dashboard/updateBook/${id}`]);
    }
}
