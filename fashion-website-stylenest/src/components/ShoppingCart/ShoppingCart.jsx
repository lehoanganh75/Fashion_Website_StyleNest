import React, { useState } from "react";
import 'boxicons/css/boxicons.min.css';
import { useCart } from "../../contexts/CartContext"; 

const ShoppingCart = () => {
  const { cart, setCart, moveToOrders } = useCart(); 
  const [allSelected, setAllSelected] = useState(true);

  const toggleSelectAll = () => {
    const newSelected = !allSelected;
    setAllSelected(newSelected);
    setCart(cart.map((item) => ({ ...item, selected: newSelected })));
  };

  const toggleSelectItem = (id) => {
    const newItems = cart.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCart(newItems);
    setAllSelected(newItems.every((item) => item.selected));
  };

  const incrementQuantity = (id) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () =>
    cart.filter((item) => item.selected).reduce((total, item) => total + item.price * (1 - item.discount / 100) * item.quantity, 0);

  const calculateTax = () => calculateSubtotal() * 0.08;

  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const selectedItems = cart.filter((item) => item.selected);
  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      moveToOrders(selectedItems);
    } else {
      alert("Vui lòng chọn sản phẩm để thanh toán.");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl font-['Roboto']">
      <div className="flex flex-col gap-8 w-[90%]">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="flex items-center text-3xl text-gray-700 font-semibold mb-6 gap-2">
            <i className="bx bx-cart text-gray-700 text-4xl"></i>
            <span>Giỏ hàng</span>
          </h1>
          {cart.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Giỏ hàng của bạn hiện tại trống.</p>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-gray-800 border-gray-300 rounded"
                  aria-label="Chọn tất cả"
                />
                <label htmlFor="select-all" className="ml-3 text-[18px] text-gray-700">Chọn tất cả</label>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-5 border border-gray-300 rounded-xl p-4 hover:shadow-md transition">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 text-gray-800 border-gray-300 rounded"
                      aria-label={`Chọn ${item.name}`}
                    />
                    <img src={item.thumbnails[0]} alt={item.name} className="w-40 h-40 object-cover rounded-lg border-gray-400" />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold text-gray-800 pb-2 truncate w-4/5">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-800 text-xl font-bold" aria-label={`Xóa ${item.name}`}>
                          <i className="bx bx-x text-2xl"></i>
                        </button>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Màu: {item.color}</p>
                        <p className="text-sm py-2 text-gray-500">Kích cỡ: {item.size}</p>
                        {item.description && <p className="text-sm text-gray-500">Mô tả: {item.description}</p>}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-3 text-sm font-semibold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-[18px] font-semibold text-gray-600 mt-1 text-center">
                          {(item.price * (1 - item.discount / 100) * item.quantity).toLocaleString("vi-VN")} VND
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Tổng tiền hóa đơn</h2>

              <div className="text-sm text-gray-600 space-y-4">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-[18px] font-medium">Tạm tính ({selectedCount} sản phẩm)</span>
                  <span className="text-[18px] font-semibold text-gray-800">{calculateSubtotal().toLocaleString("vi-VN")} VND</span>
                </div>

                <div className="flex justify-between items-center pb-3">
                  <span className="text-[18px] font-medium">Thuế GTGT (8%)</span>
                  <span className="text-[18px] font-semibold text-gray-800">{calculateTax().toLocaleString("vi-VN")} VND</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-xl font-semibold text-gray-600">
                  <span className="text-lg">Tổng thanh toán</span>
                  <span className="text-lg text-gray-600 font-bold">{calculateTotal().toLocaleString("vi-VN")} VND</span>
                </div>
              </div>

              <button
                disabled={selectedCount === 0}
                onClick={handleCheckout} 
                className={`mt-6 w-full py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out ${selectedCount === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-gray-500 to-gray-500 hover:opacity-90"}`}
              >
                Thanh toán
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
