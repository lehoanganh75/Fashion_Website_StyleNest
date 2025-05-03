import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, selected: true }]; 
      }
    });
  };

  const moveToOrders = (itemsToOrder) => {
    if (itemsToOrder && itemsToOrder.length > 0) {
        const newOrder = {
            id: `ORDER-${Date.now().toString().slice(0, 8)}`, // Create simple order ID
            date: new Date().toLocaleDateString('vi-VN'),
            status: "pending",
            statusText: "CHỜ XỬ LÝ",
            deliveryStatus: "Đang chuẩn bị",
            items: itemsToOrder.map(item => {
                const { selected, ...itemWithoutSelected } = item;
                return itemWithoutSelected;
            }),
            payment: {
                subtotal: itemsToOrder.reduce((total, item) => total + item.price * item.quantity, 0),
                shipping: 0,
                discount: 0,
                total: itemsToOrder.reduce((total, item) => total + item.price * item.quantity, 0),
            },
        };
        setOrders([newOrder, ...orders]);
        const remainingCart = cart.filter(item => !itemsToOrder.some(orderedItem => orderedItem.id === item.id));
        setCart(remainingCart);
    }
};

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, moveToOrders, orders, setOrders }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook sử dụng để truy cập CartContext
export const useCart = () => useContext(CartContext);
