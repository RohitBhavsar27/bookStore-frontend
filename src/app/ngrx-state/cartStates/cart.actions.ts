import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.model';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ id: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
