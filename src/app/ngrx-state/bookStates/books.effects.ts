import { Injectable, Pipe } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BooksActions from './books.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookService } from '../../Services/book.service';

@Injectable()
export class BooksEffects {

    constructor(
        private actions$: Actions,
        private bookService: BookService // Ensure this is correctly injected
    ) { }

    fetchAllBooks$ = createEffect(() => this.actions$.pipe(
        ofType(BooksActions.fetchAllBooks),
        mergeMap(() => {
            // console.log('fetchAllBooks effect triggered');
            return this.bookService.getAllBooks().pipe(
                map(books => {
                    // console.log('Books fetched successfully:', books);
                    return BooksActions.fetchAllBooksSuccess({ books });
                }),
                catchError(error => {
                    console.error('Error fetching books:', error);
                    return of(BooksActions.fetchAllBooksFailure({ error }));
                })
            );
        })
    ));


    addBook$ = createEffect(() => this.actions$.pipe(
        ofType(BooksActions.addBook),
        mergeMap(({ book }) => this.bookService.addBook(book).pipe(
            map(newBook => BooksActions.addBookSuccess({ book: newBook })),
            catchError(error => of(BooksActions.addBookFailure({ error })))
        ))
    ));

    updateBook$ = createEffect(() => this.actions$.pipe(
        ofType(BooksActions.updateBook),
        mergeMap(({ book }) => this.bookService.updateBook(book._id, book).pipe(
            map(updatedBook => BooksActions.updateBookSuccess({ book: updatedBook })),
            catchError(error => of(BooksActions.updateBookFailure({ error })))
        ))
    ));

    deleteBook$ = createEffect(() => this.actions$.pipe(
        ofType(BooksActions.deleteBook),
        mergeMap(({ id }) => this.bookService.deleteBook(id).pipe(
            map(() => BooksActions.deleteBookSuccess({ id })),
            catchError(error => of(BooksActions.deleteBookFailure({ error })))
        ))
    ));
}
