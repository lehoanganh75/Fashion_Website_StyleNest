"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Info, X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  isRecycled: boolean;
  imageSrc: string;
  isSelected: boolean;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "AIRism Áo Hoodie Chống UV Kéo Khóa",
    price: 588000,
    quantity: 1,
    color: "10 PINK",
    size: "Nữ S",
    isRecycled: true,
    imageSrc: "/imgs/aopolonamcaocap1.jpg",
    isSelected: false,
  },
  {
    id: 2,
    name: "Quần Jean Ống Suông Cao Cấp",
    price: 799000,
    quantity: 1,
    color: "32 BEIGE",
    size: "Nữ M",
    isRecycled: false,
    imageSrc: "/imgs/quanjeansonglungnam1.jpg",
    isSelected: false,
  },
  // Thêm sản phẩm khác nếu cần
];

interface FloatingNotificationProps {
  message: string;
  duration?: number;
}

const FloatingNotification: React.FC<FloatingNotificationProps> = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  return (
    <div
      className={`fixed top-4 right-4 bg-green-500 text-white py-3 px-4 rounded-md shadow-md z-50 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      {message}
    </div>
  );
};

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    setIsAllChecked(cartItems.every((item) => item.isSelected));
  }, [cartItems]);

  const handleIncrement = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCheckboxChange = (itemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleCheckAll = () => {
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: !isAllChecked }))
    );
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length > 0) {
      // Thực hiện logic thanh toán ở đây
      setCartItems((prevItems) => prevItems.filter((item) => !item.isSelected));
      setNotificationMessage("Thanh toán thành công!");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 3500);
      setIsAllChecked(false);
    } else {
      alert("Vui lòng chọn sản phẩm để thanh toán.");
    }
  };

  const selectedCartItems = cartItems.filter((item) => item.isSelected);
  const selectedTotalQuantity = selectedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const selectedSubtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedTaxAmount = Math.round(selectedSubtotal * 0.08);
  const selectedTotalPrice = selectedSubtotal + selectedTaxAmount;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white rounded-md shadow relative"> {/* Thêm relative để định vị FloatingNotification */}
      {notificationMessage && <FloatingNotification message={notificationMessage} />}
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">GIỎ HÀNG</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Section */}
        <div className="flex-1">
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-500 cursor-pointer mr-2"
              checked={isAllChecked}
              onChange={handleCheckAll}
            />
            <label className="text-gray-700 font-medium cursor-pointer">Chọn tất cả</label>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-6 border-b pb-6 ${
                item.isSelected ? "opacity-50" : ""
              }`}
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                checked={item.isSelected}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <div className="relative w-32 h-40 bg-gray-100 flex-shrink-0 rounded-md overflow-hidden">
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  width={128}
                  height={160}
                  className="object-cover transition duration-200 hover:scale-105"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-medium text-gray-800 hover:text-gray-900 transition duration-200">
                    {item.name}
                  </h2>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500 hover:text-red-600 transition duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <p>Màu sắc: <span className="font-medium text-gray-800">{item.color}</span></p>
                  <p>Kích cỡ: <span className="font-medium text-gray-800">{item.size}</span></p>
                  {item.isRecycled && <p>Sản phẩm được làm từ chất liệu tái chế</p>}
                </div>

                <p className="mt-3 font-medium text-gray-800">{item.price.toLocaleString('vi-VN')} VND</p>

                <div className="mt-6">
                  <p className="mb-2 font-medium text-gray-700">SỐ LƯỢNG</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="bg-gray-200 text-gray-600 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-red-500 transition duration-200"
                      disabled={item.isSelected}
                    >
                      -
                    </button>
                    <span className="text-center w-10">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="bg-gray-200 text-gray-600 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-red-500 transition duration-200"
                      disabled={item.isSelected}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <p className="font-medium text-lg text-gray-800">
                    TỔNG: {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && <p className="text-gray-500">Giỏ hàng trống.</p>}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 flex-shrink-0 bg-gray-100 rounded-md p-6 transition duration-200 hover:bg-gray-200">
          <h2 className="font-medium mb-4 text-gray-800">TỔNG ĐƠN HÀNG</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-gray-700">
              <span>Tổng cộng ({selectedTotalQuantity} sản phẩm đã chọn)</span>
              <span>{selectedSubtotal.toLocaleString('vi-VN')} VND</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Thuế GTGT (8%)</span>
              <span>{selectedTaxAmount.toLocaleString('vi-VN')} VND</span>
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between items-center font-medium text-gray-800 text-lg">
                <span>TỔNG THANH TOÁN</span>
                <span>{selectedTotalPrice.toLocaleString('vi-VN')} VND</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <button className="flex w-full items-center justify-between py-3 border-b text-gray-700 transition duration-200 hover:text-gray-900">
              <span>Phiếu giảm giá</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            <button className="flex w-full items-center justify-between py-3 border-b text-gray-700 transition duration-200 hover:text-gray-900">
              <span>Tùy chọn quà tặng</span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            <div className="py-3 flex gap-2 text-sm text-gray-500 items-center">
              <Info size={16} className="flex-shrink-0" />
              <span>
                Miễn phí giao hàng cho đơn hàng từ 500.000VND.
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white py-3 font-medium mt-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              THANH TOÁN
            </button>

            <button className="w-full border py-3 font-medium mt-3 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200">
              TIẾP TỤC MUA SẮM
            </button>

            <p className="text-sm mt-3 text-center text-gray-500">Đủ điều kiện áp dụng miễn phí vận chuyển.</p>
          </div>
        </div>
      </div>
    </div>
  );
}