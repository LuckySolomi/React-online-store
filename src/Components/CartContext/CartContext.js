import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, { item: product, quantity: 1 }]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
