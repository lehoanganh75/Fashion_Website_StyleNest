import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { Link, useNavigate } from "react-router-dom";
import orderData from "../../data/order.json"; // Đảm bảo đường dẫn này đúng với vị trí file order.json của bạn

const OrderList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState("don-mua");
  const [orders, setOrders] = useState(orderData);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("orderTracking", JSON.stringify(orders));
  }, [orders]);

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "pending", label: "Chờ thanh toán" },
    { id: "shipping", label: "Vận chuyển" },
    { id: "completed", label: "Hoàn thành" },
    { id: "cancelled", label: "Đã hủy" },
    { id: "returned", label: "Trả hàng/Hoàn tiền" },
  ];

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const handlePayment = (orderId) => {
    const orderToPay = orders.find(
      (order) => order.id === orderId && order.status === "pending"
    );

    if (orderToPay) {
      // 1. Lưu dữ liệu vào Local Storage cho order tracking
      const existingTrackingOrders = localStorage.getItem("orderTrackingDetail"); // Sử dụng key khác để tránh nhầm lẫn
      const trackingOrders = existingTrackingOrders
        ? JSON.parse(existingTrackingOrders)
        : [];
      trackingOrders.push({
        ...orderToPay,
        status: "shipping",
        statusText: "ĐANG VẬN CHUYỂN",
        deliveryStatus: "Đang chuẩn bị hàng",
      });
      localStorage.setItem("orderTrackingDetail", JSON.stringify(trackingOrders));

      // 2. Cập nhật trạng thái đơn hàng trong danh sách hiện tại
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "shipping",
              statusText: "ĐANG VẬN CHUYỂN",
              deliveryStatus: "Đang chuẩn bị hàng",
            }
          : order
      );
      setOrders(updatedOrders);

      // 3. (Tùy chọn) Lọc lại danh sách nếu đang ở tab "Chờ thanh toán" để ẩn đơn hàng đã thanh toán
      if (activeTab === "pending") {
        setActiveTab("pending"); // Gọi lại setActiveTab để kích hoạt bộ lọc
      }

      // 4. Chuyển hướng đến trang theo dõi đơn hàng (nếu bạn muốn)
      navigate("/order-tracking-detail");
    } else {
      console.log(
        "Không tìm thấy đơn hàng hoặc đơn hàng không ở trạng thái chờ thanh toán."
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4">
      {/* Header với thanh tìm kiếm */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium mr-3 hover:cursor-pointer">

            </div>
            <div>
              <div className="text-gray-800 font-medium">nam01</div>
              <div className="text-gray-500 text-xs flex items-center hover:cursor-pointer">
                <i className="bx bx-edit text-sm mr-1"></i>
                Sửa Hồ Sơ
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 border-b border-gray-200 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar và Main Content */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <div
              className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 hover:cursor-pointer transition duration-200"
              onClick={() => navigate("/notifications")}
            >
              <i className="bx bx-bell text-xl"></i>
              <span className="text-gray-700">Thông Báo</span>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 transition duration-200"
            >
              <i className="bx bx-user text-xl"></i>
              <span className="text-gray-700">Tài Khoản Của Tôi</span>
            </button>

            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 hover:cursor-pointer transition duration-200">
              <i className="bx bx-file text-xl text-orange-500"></i>
              <span className="text-orange-500 font-medium">Đơn Mua</span>
            </div>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 hover:cursor-pointer transition duration-200">
              <i className="bx bx-gift text-xl"></i>
              <span className="text-gray-700">Kho Voucher</span>
            </div>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 hover:cursor-pointer transition duration-200">
              <i className="bx bx-coin text-xl"></i>
              <span className="text-gray-700">Shopee Xu</span>
            </div>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 hover:cursor-pointer transition duration-200">
              <i className="bx bx-purchase-tag text-xl"></i>
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">
                  5.5 Siêu Sale Hàng Hiệu
                </span>
                <span className="bg-red-500 text-white text-xs px-1 rounded">
                  New
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-grow">
          {/* Search Bar */}
          <div className="bg-white rounded-sm shadow-sm p-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Bạn có thể tìm kiếm theo ID đơn hàng hoặc Tên Sản phẩm"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-orange-500"
              />
              <i className="bx bx-search absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          {/* Orders */}
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-sm shadow-sm mb-4">
              {/* Order Header */}
              <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <i className="bx bx-store text-xl text-gray-600"></i>
                  <span className="font-medium text-gray-800">
                    {order.shop.name}
                  </span>
                  {order.shop.chat && (
                    <button className="px-2 py-1 border border-gray-300 rounded-sm text-xs text-gray-600 ml-2">
                      <i className="bx bx-message-detail mr-1"></i> Chat
                    </button>
                  )}
                  {order.shop.viewShop && (
                    <button className="px-2 py-1 border border-gray-300 rounded-sm text-xs text-gray-600">
                      <i className="bx bx-store mr-1"></i> Xem Shop
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm ${
                      order.status === "completed"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    <i className="bx bx-package mr-1"></i>
                    {order.deliveryStatus}
                  </div>
                  <span className="text-gray-400">|</span>
                  <div className="text-orange-500 font-medium">
                    {order.statusText}
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-4 flex gap-4 border-b border-gray-100">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={
                      order.product.image ||
                      "/placeholder.svg?height=80&width=80"
                    }
                    alt={order.product.name}
                    className="w-full h-full object-cover border border-gray-200 rounded-sm"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-gray-800 text-sm line-clamp-2">
                    {order.product.name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Phân loại hàng: {order.product.type}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    x{order.product.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 line-through text-xs">
                    ₫{order.product.originalPrice.toLocaleString("vi-VN")}
                  </div>
                  <div className="text-orange-500 font-medium">
                    ₫{order.product.price.toLocaleString("vi-VN")}
                  </div>
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex items-center mb-3 sm:mb-0">
                  <i className="bx bx-credit-card text-gray-500 mr-2"></i>
                  <span className="text-gray-600 text-sm">Thành tiền:</span>
                  <span className="text-orange-500 text-xl font-medium ml-2">
                    ₫{order.payment.total.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/product/${order.product.id}`}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition text-sm"
                  >
                    Xem Chi Tiết
                  </Link>
                  {order.status === "completed" && (
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition text-sm">
                      Mua Lại
                    </button>
                  )}
                  {order.status === "shipping" && (
                    <Link to={`/order-tracking/${order.id}`}>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition text-sm">
                        Theo Dõi Đơn
                      </button>
                    </Link>
                  )}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handlePayment(order.id)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition text-sm"
                    >
                      Thanh Toán
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="bg-white rounded-sm shadow-sm p-8 text-center">
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="No orders"
                className="w-24 h-24 mx-auto mb-4 opacity-50"
              />
              <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;