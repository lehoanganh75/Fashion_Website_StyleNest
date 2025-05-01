import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-800 via-gray-900 to-black text-white mt-auto font-['Roboto']">
      {/* Nội dung chính của Footer */}
      <div className="container mx-auto px-16 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Liên hệ */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Liên Hệ</h3>
          <p className="text-sm mb-1">Classyshop - Thời Trang Thương Hiệu</p>
          <p className="text-sm mb-1">12 - Trung Tâm Giao Thương Việt Lào</p>
          <p className="text-sm mb-4">Việt Nam</p>
          <p className="text-sm mb-2">fashionstylenest@gmail.com</p>
          <p className="text-lg font-semibold mb-4">( +91 ) 9876-543-210</p>

          <div className="flex items-center gap-3 mt-6">
            <div className="bg-orange-50 p-2 rounded-full border border-orange-200 hover:bg-orange-100 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Chat Trực Tuyến</p>
              <p className="text-sm text-gray-400">Nhận hỗ trợ từ chuyên gia</p>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Sản Phẩm</h3>
          <ul className="space-y-3 text-sm">
            {[
              "Giảm Giá",
              "Sản Phẩm Mới",
              "Bán Chạy",
              "Liên Hệ",
              "Sơ Đồ Website",
              "Cửa Hàng",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="hover:text-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Công ty của chúng tôi */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Công Ty</h3>
          <ul className="space-y-3 text-sm">
            {[
              "Giao Hàng",
              "Thông Báo Pháp Lý",
              "Điều Khoản Sử Dụng",
              "Về Chúng Tôi",
              "Thanh Toán An Toàn",
              "Đăng Nhập",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Đăng ký nhận tin */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Đăng Ký Nhận Bản Tin</h3>
          <p className="text-sm mb-4">Đăng ký để nhận tin tức về khuyến mãi & ưu đãi đặc biệt.</p>
          <input
            type="email"
            placeholder="Nhập địa chỉ email của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white"
          />
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md uppercase text-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
            Đăng Ký
          </button>
          <div className="flex items-start mt-3">
            <input type="checkbox" id="terms" className="mt-1 mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-400">
              Tôi đồng ý với các điều khoản và chính sách bảo mật
            </label>
          </div>
        </div>
      </div>

      {/* Footer dưới */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Mạng xã hội */}
          <div className="flex space-x-6">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-4 rounded-full border border-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>

          {/* Bản quyền */}
          <div className="text-sm text-gray-400 text-center mt-4 md:mt-0">
            © 2025 - Thời Trang StyleNest | All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
