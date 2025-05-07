import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const OrderList = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const { orders, setOrders } = useData();
  const { loggedInAccount } = useAuth();

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (orders && loggedInAccount?.email) {
      const filtered = orders.filter(
        (order) => order.email === loggedInAccount.email
      );
      setUserOrders(filtered);
    } else {
      setUserOrders([]);
    }
  }, [orders, loggedInAccount]);

  console.log(userOrders);

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
      ? userOrders
      : userOrders.filter((order) => order.status === activeTab);

  const handlePayment = (orderId) => {
    const orderToPay = orders.find(
      (order) => order.id === orderId && order.status === "pending"
    );

    if (orderToPay) {
      const existingTrackingOrders = localStorage.getItem("orderTrackingDetail");
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
      if (activeTab === "pending") setActiveTab("pending");

      navigate("/order-tracking-detail");
    } else {
      console.log("Không tìm thấy đơn hàng hoặc đơn hàng không ở trạng thái chờ thanh toán.");
    }
  };

  if (!loggedInAccount) {
    return (
      <div className="bg-gray-100 min-h-screen font-sans p-4 text-center text-gray-600 text-lg">
        Vui lòng <span className="text-orange-500 font-semibold cursor-pointer">đăng nhập</span> để xem đơn hàng.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full mr-3" />
            <div>
              <div className="text-gray-800 font-medium">{loggedInAccount.userName}</div>
              <div className="text-gray-500 text-xs flex items-center">
                <i className="bx bx-edit text-sm mr-1"></i>Sửa Hồ Sơ
              </div>
            </div>
          </div>
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

      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <div
              className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              <i className="bx bx-bell text-xl"></i>
              <span className="text-gray-700">Thông Báo</span>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500"
            >
              <i className="bx bx-user text-xl"></i>
              <span className="text-gray-700">Tài Khoản Của Tôi</span>
            </button>
            <div className="flex items-center gap-3 py-2 text-orange-500 font-medium">
              <i className="bx bx-file text-xl"></i>
              <span>Đơn Mua</span>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="bg-white rounded-sm shadow-sm p-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo ID hoặc Tên Sản phẩm"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-orange-500"
              />
              <i className="bx bx-search absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          {filteredOrders.map((order) => (
  <div key={order.id} className="bg-white rounded-sm shadow-sm mb-6 border border-gray-200">
    {/* Header */}
    <div className="flex justify-between items-center p-4 border-b bg-gray-50">
      <div className="font-semibold text-gray-700">Mã đơn hàng: #{order.id}</div>
    </div>

    {/* Product list */}
    {order.orderDetails?.map((product) => (
      <div
        key={`${order.id}-${product.productId}`}
        className="p-4 flex gap-4 border-b last:border-b-0"
      >
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={product.img || "/placeholder.svg"}
            alt={product.productName}
            className="w-full h-full object-cover border border-gray-200 rounded-sm"
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-800">{product.productName}</h3>
          <p className="text-xs text-gray-500">x{product.quantity}</p>
        </div>
        <div className="text-right">
          <div className="text-xs line-through text-gray-400">{product.price}</div>
          <div className="text-sm text-orange-500 font-medium">{product.total}</div>
        </div>
      </div>
    ))}

    {/* Payment method */}
    <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
      <span className="text-sm text-gray-600">Phương thức thanh toán:</span>
      <span className="text-sm font-medium text-gray-700">{order.paymentMethod || "Không rõ"}</span>
    </div>

    {/* Timeline */}
    {order.timeline?.length > 0 && (
      <div className="px-4 pt-2 pb-4 text-sm text-gray-600 space-y-1">
        <div className="font-semibold text-gray-700">Trạng thái đơn hàng:</div>
        {order.timeline.map((timelineItem, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{timelineItem.status}</span>
            <span className="text-xs text-gray-500">{timelineItem.orderDate}</span>
          </div>
        ))}
      </div>
    )}
  </div>
))}


          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              Không có đơn hàng nào trong mục này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;