import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './layouts/main-layout/home/home.component';
import { OrdersComponent } from './layouts/main-layout/orders/orders.component';
import { CartComponent } from './layouts/main-layout/cart/cart.component';
import { LoginComponent } from './layouts/main-layout/login/login.component';
import { RegisterComponent } from './layouts/main-layout/register/register.component';
import { BookDetailsComponent } from './layouts/main-layout/book-details/book-details.component';
import { CheckoutComponent } from './layouts/main-layout/checkout/checkout.component';
import { AdminLoginComponent } from './layouts/admin-layout/admin-login/admin-login.component';
import { AddBookComponent } from './layouts/admin-layout/dashboard-layout/manage-books/add-book/add-book.component';
import { UpdateBookComponent } from './layouts/admin-layout/dashboard-layout/manage-books/update-book/update-book.component';
import { ManageBooksComponent } from './layouts/admin-layout/dashboard-layout/manage-books/manage-books.component';
import { DashboardLayoutComponent } from './layouts/admin-layout/dashboard-layout/dashboard-layout.component';
import { AdminAuthGuard } from './Guards/admin-auth.guard';
import { DashboardComponent } from './layouts/admin-layout/dashboard-layout/dashboard/dashboard.component';
import { AuthGuard } from './Guards/auth.guard';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'orders',
                component: OrdersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'books/:id',
                component: BookDetailsComponent,
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                canActivate: [AuthGuard]
            },
        ],
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            {
                path: 'login',
                component: AdminLoginComponent,
            },
            {
                path: 'dashboard',
                component: DashboardLayoutComponent,
                canActivate: [AdminAuthGuard],
                children: [
                    {
                        path: '',
                        component: DashboardComponent,
                        canActivate: [AdminAuthGuard]
                    },
                    {
                        path: 'addBook',
                        component: AddBookComponent,
                        canActivate: [AdminAuthGuard]
                    },
                    {
                        path: 'updateBook/:id',
                        component: UpdateBookComponent,
                        canActivate: [AdminAuthGuard]
                    },
                    {
                        path: 'manageBooks',
                        component: ManageBooksComponent,
                        canActivate: [AdminAuthGuard]
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
