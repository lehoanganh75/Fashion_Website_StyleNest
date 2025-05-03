"use client";
import { Link, useParams } from "react-router-dom";
import orderDetailData from "../../data/orderDetail.json"; // Import file JSON

const OrderTrackingDetail = () => {
  const { orderId } = useParams();
  console.log("Giá trị orderId nhận được:", orderId);
  // Tìm đơn hàng chi tiết dựa trên orderId
  const orderData = orderDetailData.find(
    (order) => order.id === parseInt(orderId)
  );

  // Nếu không tìm thấy đơn hàng, hiển thị thông báo lỗi hoặc chuyển hướng
  if (!orderData) {
    return (
      <div className="bg-gray-100 min-h-screen font-sans p-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-md shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Không tìm thấy đơn hàng
            </h2>
            <Link
              to="/order-tracking"
              className="text-blue-500 hover:underline"
            >
              Quay lại trang đơn hàng
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link
            to="/order-tracking" // Assuming your order list route is "/order-tracking"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <i className="bx bx-arrow-back text-xl"></i>
            <span className="text-gray-800 font-medium">TRỞ LẠI</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-gray-800 font-medium">
              MÃ ĐƠN HÀNG: {orderData.id}
            </span>
            <span className="text-gray-400">|</span>
            <span
              className={`font-medium ${
                orderData.status === "completed"
                  ? "text-green-500"
                  : "text-orange-500"
              }`}
            >
              {orderData.status === "completed"
                ? "ĐƠN HÀNG ĐÃ HOÀN THÀNH"
                : orderData.status === "shipping"
                ? "ĐANG VẬN CHUYỂN"
                : "ĐANG XỬ LÝ"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Order Timeline */}
        <div className="bg-white rounded-md shadow-sm mb-6 p-6">
          <div className="flex justify-between items-center relative">
            {/* Timeline Line */}
            <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200 z-0">
              <div
                className="absolute top-0 left-0 h-full bg-green-500"
                style={{
                  width: `${
                    ((orderData.timeline.findIndex(
                      (t) => t.status === orderData.status
                    ) +
                      1) /
                      orderData.timeline.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>

            {/* Timeline Steps */}
            {orderData.timeline.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4
                    ${
                      index <=
                      orderData.timeline.findIndex(
                        (t) => t.status === orderData.status
                      )
                        ? "bg-green-500 border-green-100"
                        : "bg-gray-200 border-gray-100"
                    }`}
                >
                  <i
                    className={`bx ${step.icon} text-2xl ${
                      index <=
                      orderData.timeline.findIndex(
                        (t) => t.status === orderData.status
                      )
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  ></i>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center max-w-[100px]">
                  {step.title}
                </p>
                <p className="text-[10px] text-gray-400 text-center">
                  {step.date}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-md shadow-sm mb-6 p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-medium text-gray-800">
              Địa Chỉ Nhận Hàng
            </h2>
            <div className="text-right">
              <div className="text-gray-600">{orderData.delivery.carrier}</div>
              <div className="text-gray-600">
                {orderData.delivery.trackingNumber}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="font-medium text-gray-800">
              {orderData.delivery.recipient}
            </div>
            <div className="text-gray-600 mt-1">{orderData.delivery.phone}</div>
            <div className="text-gray-600 mt-1">
              {orderData.delivery.address}
            </div>
          </div>
        </div>

        {/* Tracking Events */}
        <div className="bg-white rounded-md shadow-sm mb-6 p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Lịch Sử Vận Chuyển
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

            {/* Events */}
            {orderData.trackingEvents.map((event, index) => (
              <div key={index} className="flex items-start mb-6 last:mb-0">
                <div
                  className={`w-3.5 h-3.5 rounded-full mt-1.5 flex-shrink-0 z-10
                    ${event.isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <div className="ml-6">
                  <div className="text-sm font-medium text-gray-800">
                    {event.time}
                  </div>
                  <div className="text-sm text-gray-600">{event.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-md shadow-sm mb-6">
          {/* Shop Info */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className="bx bx-store text-xl text-gray-600"></i>
              <span className="font-medium text-gray-800">
                {orderData.shop.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {orderData.shop.chat && (
                <button className="px-3 py-1.5 bg-orange-500 text-white rounded-sm text-sm flex items-center">
                  <i className="bx bx-message-detail mr-1"></i> Chat
                </button>
              )}
              {orderData.shop.viewShop && (
                <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-sm text-sm flex items-center">
                  <i className="bx bx-store mr-1"></i> Xem Shop
                </button>
              )}
            </div>
          </div>

          {/* Product */}
          <div className="p-4 flex gap-4">
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={
                  orderData.product.image ||
                  "/placeholder.svg?height=80&width=80"
                }
                alt={orderData.product.name}
                className="w-full h-full object-cover border border-gray-200 rounded-sm"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-gray-800 text-sm line-clamp-2">
                {orderData.product.name}
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Phân loại hàng: {orderData.product.category}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                x{orderData.product.quantity}
              </p>
            </div>
            <div className="text-right">
              <div className="text-gray-400 line-through text-xs">
                ₫{orderData.product.originalPrice.toLocaleString("vi-VN")}
              </div>
              <div className="text-orange-500 font-medium">
                ₫{orderData.product.price.toLocaleString("vi-VN")}
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="p-4 border-t border-gray-100 flex justify-end">
            <div className="text-right">
              <div className="text-gray-600 text-sm">Tổng tiền:</div>
              <div className="text-orange-500 font-medium text-xl">
                ₫{orderData.payment.total.toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingDetail;
