import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      return { ...state, products: [...state.products, action.payload] };
    },
    removeFromCart(state, action) {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id,
        ),
      };
    },
    increaseQuantity(state, action) {
      return {
        ...state,
        products: state.products.map((product) => {
          if (
            product.id === action.payload.id &&
            action.payload.quantity < product.stock
          ) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        }),
      };
    },
    decreaseQuantity(state, action) {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id && product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        }),
      };
    },
    clearCart(state, action) {
      return { ...state, products: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
