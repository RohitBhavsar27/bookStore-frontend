export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string; 
    coverImage?: string; 
  }
  

export interface CartState {
    cartItems: CartItem[];
}
