import React, { createContext, useContext, useState } from 'react';

// Tạo CartContext
const CartContext = createContext();

// Tạo CartProvider để cung cấp context cho các component con
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Hàm để thêm sản phẩm vào giỏ hàng hoặc tăng số lượng nếu sản phẩm đã có trong giỏ hàng
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
        return [...prevCart, { ...product, selected: true }]; // Thêm selected mặc định
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook sử dụng để truy cập CartContext
export const useCart = () => useContext(CartContext);
