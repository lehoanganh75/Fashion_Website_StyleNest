import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      {/* Nội dung chính của Footer */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Liên hệ */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Liên Hệ</h3>
          <p className="text-sm mb-1 py-2">Classyshop - Thời Trang Thương Hiệu</p>
          <p className="text-sm mb-1 py-2">12 - Trung Tâm Giao Thương Việt Lào</p>
          <p className="text-sm mb-4 py-2">Việt Nam</p>
          <p className="text-sm mb-2 py-2">fashionstylenest@gmail.com</p>
          <p className="text-lg font-semibold text-red-500 mb-4 py-2">
            (+91) 9876-543-210
          </p>

          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-full border border-red-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Chat Trực Tuyến</p>
              <p className="text-sm text-gray-500">Nhận hỗ trợ từ chuyên gia</p>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Sản Phẩm</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Giảm Giá",
              "Sản Phẩm Mới",
              "Bán Chạy",
              "Liên Hệ",
              "Sơ Đồ Website",
              "Cửa Hàng",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Công ty của chúng tôi */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Công Ty</h3>
          <ul className="space-y-2 text-sm">
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
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Đăng ký nhận tin */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Đăng Ký Nhận Bản Tin
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Đăng ký để nhận tin tức về khuyến mãi & ưu đãi đặc biệt.
          </p>
          <input
            type="email"
            placeholder="Nhập địa chỉ email của bạn"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md uppercase text-sm font-semibold transition">
            Đăng Ký
          </button>
          <div className="flex items-start mt-3">
            <input type="checkbox" id="terms" className="mt-1 mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-500">
              Tôi đồng ý với các điều khoản và chính sách bảo mật
            </label>
          </div>
        </div>
      </div>

      {/* Footer dưới */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Mạng xã hội */}
          <div className="flex space-x-3">
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-2 rounded-full border border-gray-300 hover:bg-red-500 hover:text-white transition"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Bản quyền */}
          <div className="text-sm text-gray-500 text-center">
            © 2025 - Thời Trang StyleNest
          </div>
        </div>
      </div>
    </footer>
  );
}
