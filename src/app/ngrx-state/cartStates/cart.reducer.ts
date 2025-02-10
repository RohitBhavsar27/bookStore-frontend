import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, clearCart } from './cart.actions';
import { CartState } from './cart.model';
import Swal from 'sweetalert2';

export const initialState: CartState = {
    cartItems: []
};

export const cartReducer = createReducer(
    initialState,

    on(addToCart, (state, { item }) => {
        const existingItem = state.cartItems.find(cartItem => cartItem._id === item._id);
        if (!existingItem) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Added to the Cart",
                showConfirmButton: false,
                timer: 1500
            });

            return {
                ...state,
                cartItems: [...state.cartItems, item]
            };
        } else {
            Swal.fire({
                title: "Already Added to the Cart",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK!"
            });

            return state;
        }
    }),

    on(removeFromCart, (state, { id }) => ({
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== id)
    })),

    on(clearCart, state => ({
        ...state,
        cartItems: []
    }))
);
