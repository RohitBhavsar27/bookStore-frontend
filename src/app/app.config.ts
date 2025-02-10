import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { cartReducer } from './ngrx-state/cartStates/cart.reducer';
import { environment } from '../environments/environment.development';
import { LoadingComponent } from './loading/loading.component';
import { provideEffects } from '@ngrx/effects';
import { BooksEffects } from './ngrx-state/bookStates/books.effects';
import { booksReducer } from './ngrx-state/bookStates/books.reducer';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        provideStore({
            cart: cartReducer,
            books: booksReducer
        }),
        // provideEffects([BooksEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            autoPause: true,
            trace: false,
            traceLimit: 75,
            connectInZone: true,
        }),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        LoadingComponent,
        provideCharts(withDefaultRegisterables()),
    ],
};


