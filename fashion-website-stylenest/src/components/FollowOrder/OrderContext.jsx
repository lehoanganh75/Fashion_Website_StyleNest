import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); // New state for orders

  const addToCart = (item) => {
    setCart([...cart, { ...item, id: Date.now().toString(), quantity: 1, selected: true }]); // Use Date.now() for a simple ID
  };

  const updateCartItem = (id, updates) => {
    setCart(cart.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
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
    <CartContext.Provider value={{ cart, setCart, addToCart, updateCartItem, removeFromCart, clearCart, orders, setOrders, moveToOrders }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
