import React, { createContext, useContext, useState } from 'react';
import { useData } from './DataContext';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemSelected, setCartItemSelected] = useState([]);
  const [total, setTotal] = useState("");
  const [tax, setTax] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const { setOrders } = useData();

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

  const saveOrders = async (newOrder) => {
    try {
      // 1. Gửi đơn hàng
      const response = await axios.post("http://localhost:5000/api/orders", newOrder);
      console.log("Lưu đơn hàng thành công:", response.data);
  
      // 2. Cập nhật danh sách đơn hàng
      const updatedOrdersResponse = await axios.get("http://localhost:5000/api/orders");
      setOrders(updatedOrdersResponse.data);
  
      // 3. Xóa khỏi giỏ hàng các item đã đặt mua
      setCart((prevCart) =>
        prevCart.filter((item) =>
          !newOrder.orderDetails.some((i) => i.productId === item.id)
        )
      );
  
      // 4. Cập nhật số lượng tồn kho từng sản phẩm
      for (const product of newOrder.orderDetails) {
        const productId = product.productId;
        const quantityPurchased = product.quantity;
  
        // Lấy thông tin sản phẩm hiện tại
        const productResponse = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const currentProduct = productResponse.data;
        console.log("Sản phẩm hiện tại:", currentProduct);
  
        // Trừ đi số lượng đã mua
        const updatedQuantity = currentProduct.instock - quantityPurchased;
  
        // Gửi yêu cầu cập nhật số lượng tồn
        await axios.put(`http://localhost:5000/api/products/update-stock/${productId}`, {
          instock: updatedQuantity
        });        
      }
    } catch (error) {
      console.error("Lỗi khi lưu đơn hàng:", error);
    }
  };  

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, saveOrders, cartItemSelected, setCartItemSelected, total, setTotal, tax, setTax, subtotal, setSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);