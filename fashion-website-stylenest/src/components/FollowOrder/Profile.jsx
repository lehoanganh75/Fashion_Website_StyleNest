import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Package, Edit, User, Gift, CoinsIcon as Coin, Tag } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

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
              <Link to="/profile/edit" className="text-gray-500 text-xs flex items-center cursor-pointer">
                <Edit className="h-3 w-3 mr-1" />
                Sửa Hồ Sơ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-sm shadow-sm p-4 space-y-2">
            <Link to="/notifications" className="block hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3">
              <Bell className="h-5 w-5" />
              <span className="text-gray-700">Thông Báo</span>
            </Link>
            <div className="bg-orange-50 text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3 font-medium">
              <User className="h-5 w-5" />
              <span>Tài Khoản Của Tôi</span>
            </div>
            <Link to="/order-tracking" className="block hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3">
              <Package className="h-5 w-5" />
              <span className="text-gray-700">Đơn Mua</span>
            </Link>
            <div className="hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3">
              <Gift className="h-5 w-5" />
              <span className="text-gray-700">Kho Voucher</span>
            </div>
            <div className="hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3">
              <Coin className="h-5 w-5" />
              <span className="text-gray-700">Shopee Xu</span>
            </div>
            <div className="hover:bg-orange-50 hover:text-orange-500 cursor-pointer transition duration-200 rounded-sm px-2 py-2 flex items-center gap-3">
              <Tag className="h-5 w-5" />
              <div className="flex items-center">
                <span className="text-gray-700 mr-2">5.5 Siêu Sale Hàng Hiệu</span>
                <span className="bg-red-500 text-white text-xs px-1 rounded">New</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="bg-white rounded-sm shadow-sm p-6">
            <h1 className="text-xl font-medium mb-6">Hồ Sơ Của Tôi</h1>
            <p className="text-gray-500 text-sm mb-6">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label htmlFor="username" className="text-gray-500 text-right md:pr-4 flex items-center">
                  Tên đăng nhập
                </label>
                <div className="md:col-span-2">
                  <span className="text-gray-800">Tài khoản</span>
                </div>

                <label htmlFor="name" className="text-gray-500 text-right md:pr-4 flex items-center">
                  Tên
                </label>
                <div className="md:col-span-2">
                  <input id="name" defaultValue="Nguyễn Văn A" className="max-w-md border border-gray-300 rounded-sm p-2" />
                </div>

                <label htmlFor="email" className="text-gray-500 text-right md:pr-4 flex items-center">
                  Email
                </label>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">ng***@gmail.com</span>
                    <button className="outline-none border border-gray-300 rounded-sm px-2 py-1 text-xs h-7 hover:border-orange-500 hover:text-orange-500 transition duration-200">
                      Thay đổi
                    </button>
                  </div>
                </div>

                <label htmlFor="phone" className="text-gray-500 text-right md:pr-4 flex items-center">
                  Số điện thoại
                </label>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800">098*****12</span>
                    <button className="outline-none border border-gray-300 rounded-sm px-2 py-1 text-xs h-7 hover:border-orange-500 hover:text-orange-500 transition duration-200">
                      Thay đổi
                    </button>
                  </div>
                </div>

                <label className="text-gray-500 text-right md:pr-4 flex items-center">Giới tính</label>
                <div className="md:col-span-2">
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <input type="radio" value="male" id="male" name="gender" defaultChecked />
                      <label htmlFor="male">Nam</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" value="female" id="female" name="gender" />
                      <label htmlFor="female">Nữ</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" value="other" id="other" name="gender" />
                      <label htmlFor="other">Khác</label>
                    </div>
                  </div>
                </div>

                <label htmlFor="birthday" className="text-gray-500 text-right md:pr-4 flex items-center">
                  Ngày sinh
                </label>
                <div className="md:col-span-2">
                  <div className="flex gap-2 max-w-md">
                    <select className="border border-gray-300 rounded-sm p-2 flex-1">
                      <option>1</option>
                      {/* More options */}
                    </select>
                    <select className="border border-gray-300 rounded-sm p-2 flex-1">
                      <option>Tháng 1</option>
                      {/* More options */}
                    </select>
                    <select className="border border-gray-300 rounded-sm p-2 flex-1">
                      <option>1990</option>
                      {/* More options */}
                    </select>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div></div>
                <div className="md:col-span-2 mt-4">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-sm px-4 py-2 transition duration-200">Lưu</button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}