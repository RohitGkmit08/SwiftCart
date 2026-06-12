import { createSlice } from "@reduxjs/toolkit";

const initialCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialTotalAmount = localStorage.getItem("totalAmount")
  ? JSON.parse(localStorage.getItem("totalAmount"))
  : 0;

const initialState = {
  cartItems: initialCartItems,
  totalAmount: initialTotalAmount,
};

const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === product._id);

      if (existingItem) {
        // If product stock is specified, ensure we don't exceed it
        if (product.stock && existingItem.quantity >= product.stock) {
          return;
        }
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          quantity: 1,
        });
      }

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== id);

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem && quantity >= 1) {
        if (existingItem.stock && quantity > existingItem.stock) {
          existingItem.quantity = existingItem.stock;
        } else {
          existingItem.quantity = quantity;
        }
      }

      state.totalAmount = calculateTotal(state.cartItems);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalAmount");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;