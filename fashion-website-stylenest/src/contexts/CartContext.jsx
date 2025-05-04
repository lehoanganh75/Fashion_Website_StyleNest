import React, { createContext, useContext, useState } from 'react';
import { useData } from './DataContext';
import { useAuth } from './AuthContext';
import { Email } from '@mui/icons-material';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { orders, customers } = useData();
  const { loggedInAccount } = useAuth();

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

  const moveToOrders = (items) => {
    if (items && items.length > 0 && loggedInAccount) {
      const id = orders.length + 1;
  
      const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
        0
      );
      const subtotal = total * 1.08; // đã bao gồm 8% thuế
      
      const foundCustomer = customers.find(
        (cus) => cus.email === loggedInAccount.email
      );

      console.log("Khách hàng: ", foundCustomer)

      const newOrder = {
        id,
        img: foundCustomer.img,
        email: loggedInAccount.email,
        customerName: foundCustomer.customerName,
        total: parseFloat(subtotal.toFixed(2)),
        status: "Đang xử lý",
        address: "Số 10, Đường XYZ, Quận 3, TP.HCM",
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price * (1 - item.discount / 100),
          total: item.price * (1 - item.discount / 100) * item.quantity,
          img: item.thumbnails[0],
        })),
      };
      console.log("Đơn hàng mới:", newOrder);

      setCart((prevCart) =>
        prevCart.filter((item) => !items.some((i) => i.id === item.id))
      );
    }
  };  

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, moveToOrders }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);