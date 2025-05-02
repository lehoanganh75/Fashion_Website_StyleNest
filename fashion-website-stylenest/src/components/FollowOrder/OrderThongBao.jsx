"use client"

import { useState } from "react"
import {Link} from "react-router-dom"
import { Bell, Package, Edit, User, Gift, CoinsIcon as Coin, Tag, CreditCard, Percent } from "lucide-react"

export default function OrderThongBao() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "order", label: "Đơn hàng" },
    { id: "promotion", label: "Khuyến mãi" },
    { id: "wallet", label: "Ví" },
    { id: "activity", label: "Hoạt động" },
  ]

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Đơn hàng #123456 đã được giao thành công",
      message: "Đơn hàng của bạn đã được giao thành công. Hãy đánh giá sản phẩm để nhận xu nhé!",
      time: "13/10/2021",
      read: false,
      icon: <Package className="h-10 w-10 p-2 bg-blue-100 text-blue-500 rounded-full" />,
    },
    {
      id: 2,
      type: "promotion",
      title: "Mã giảm giá mới dành cho bạn!",
      message: "Giảm 50k cho đơn hàng từ 200k. Hạn sử dụng: 30/10/2021",
      time: "12/10/2021",
      read: true,
      icon: <Percent className="h-10 w-10 p-2 bg-orange-100 text-orange-500 rounded-full" />,
    },
    {
      id: 3,
      type: "wallet",
      title: "Nạp tiền thành công",
      message: "Bạn đã nạp thành công 500.000đ vào ví của mình",
      time: "10/10/2021",
      read: true,
      icon: <CreditCard className="h-10 w-10 p-2 bg-green-100 text-green-500 rounded-full" />,
    },
  ]

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((notification) => notification.type === activeTab)

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4">
      {/* Header with profile */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium mr-3 cursor-pointer">
              
            </div>
            <div>
              <div className="text-gray-800 font-medium">nam01</div>
              <div className="text-gray-500 text-xs flex items-center cursor-pointer">
                <Edit className="h-3 w-3 mr-1" />
                Sửa Hồ Sơ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-sm shadow-sm p-4">
            <div className="flex items-center gap-3 py-2 bg-orange-50 text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
              <Bell className="h-5 w-5" />
              <span className="font-medium">Thông Báo</span>
            </div>
            <Link to="/profile" className="block">
              <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
                <User className="h-5 w-5" />
                <span className="text-gray-700">Tài Khoản Của Tôi</span>
              </div>
            </Link>
            <Link to="/order-tracking" className="block">
              <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
                <Package className="h-5 w-5" />
                <span className="text-gray-700">Đơn Mua</span>
              </div>
            </Link>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
              <Gift className="h-5 w-5" />
              <span className="text-gray-700">Kho Voucher</span>
            </div>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
              <Coin className="h-5 w-5" />
              <span className="text-gray-700">Shopee Xu</span>
            </div>
            <div className="flex items-center gap-3 py-2 hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2">
              <Tag className="h-5 w-5" />
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">5.5 Siêu Sale Hàng Hiệu</span>
                <span className="bg-red-500 text-white text-xs px-1 rounded">New</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Notification Tabs */}
          <div className="bg-white rounded-sm shadow-sm mb-4">
            <div className="border-b border-gray-200 overflow-x-auto">
              <div className="flex space-x-6 min-w-max px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 text-sm font-medium transition-colors relative ${
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

          {/* Notifications List */}
          <div className="bg-white rounded-sm shadow-sm">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex gap-4 border-b border-gray-100 ${!notification.read ? "bg-orange-50" : ""}`}
                >
                  {notification.icon}
                  <div className="flex-grow">
                    <h3 className="text-gray-800 font-medium">{notification.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full self-start mt-2"></div>}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Bell className="w-full h-full text-gray-300" />
                </div>
                <p className="text-gray-500">Không có thông báo nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
