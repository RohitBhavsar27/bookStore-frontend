import { createAction, props } from '@ngrx/store';
import { Book } from './books.model';

export const fetchAllBooks = createAction('[Books] Fetch All Books');
export const fetchAllBooksSuccess = createAction('[Books] Fetch All Books Success', props<{ books: Book[] }>());
export const fetchAllBooksFailure = createAction('[Books] Fetch All Books Failure', props<{ error: any }>());

export const addBook = createAction('[Books] Add Book', props<{ book: Book }>());
export const addBookSuccess = createAction('[Books] Add Book Success', props<{ book: Book }>());
export const addBookFailure = createAction('[Books] Add Book Failure', props<{ error: any }>());

export const updateBook = createAction('[Books] Update Book', props<{ book: Book }>());
export const updateBookSuccess = createAction('[Books] Update Book Success', props<{ book: Book }>());
export const updateBookFailure = createAction('[Books] Update Book Failure', props<{ error: any }>());

export const deleteBook = createAction('[Books] Delete Book', props<{ id: string }>());
export const deleteBookSuccess = createAction('[Books] Delete Book Success', props<{ id: string }>());
export const deleteBookFailure = createAction('[Books] Delete Book Failure', props<{ error: any }>());

export * from './books.actions';