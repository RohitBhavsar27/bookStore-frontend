import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { Book } from './books.model';

export interface BooksState {
    books: Book[];
    loading: boolean;
    error: any;
}

export const initialState: BooksState = {
    books: [],
    loading: false,
    error: null
};

export const booksReducer = createReducer(
    initialState,
    on(BooksActions.fetchAllBooks, state => ({ ...state, loading: true })),
    on(BooksActions.fetchAllBooksSuccess, (state, { books }) => ({ ...state, loading: false, books })),
    on(BooksActions.fetchAllBooksFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BooksActions.addBook, state => ({ ...state, loading: true })),
    on(BooksActions.addBookSuccess, (state, { book }) => ({ ...state, loading: false, books: [...state.books, book] })),
    on(BooksActions.addBookFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BooksActions.updateBook, state => ({ ...state, loading: true })),
    on(BooksActions.updateBookSuccess, (state, { book }) => ({
        ...state,
        loading: false,
        books: state.books.map(b => b._id === book._id ? book : b)
    })),
    on(BooksActions.updateBookFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BooksActions.deleteBook, state => ({ ...state, loading: true })),
    on(BooksActions.deleteBookSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        books: state.books.filter(book => book._id !== id)
    })),
    on(BooksActions.deleteBookFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
