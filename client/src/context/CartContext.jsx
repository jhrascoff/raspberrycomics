import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addToCart(comic) {
    setItems(prev => {
      const existing = prev.find(i => i.id === comic.id);
      if (existing) {
        return prev.map(i => i.id === comic.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...comic, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) return removeFromCart(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
