import { Search, ShoppingBag, Tag, CreditCard, Truck, RefreshCcw, Info, X } from "lucide-react"

export default function ShopeeHelpCenter() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#ee4d2d] text-white py-8 px-4 text-center">
        <h1 className="text-2xl font-medium mb-6">Xin chào, StyleNest có thể giúp gì cho bạn?</h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            placeholder="Nhập từ khóa hoặc nội dung cần tìm"
            className="flex-grow p-3 rounded-l-md bg-white text-gray-800 focus:outline-none"
          />
          <button className="bg-[#ee4d2d] border border-white p-3 rounded-r-md hover:bg-[#d23f20] transition">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Categories */}
        <h2 className="text-xl font-medium mb-4">Danh mục</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <CategoryCard icon={<ShoppingBag className="w-6 h-6 text-[#ee4d2d]" />} title="Mua Sắm Cùng Shopee" />
          <CategoryCard icon={<Tag className="w-6 h-6 text-[#ee4d2d]" />} title="Khuyến Mãi & Ưu Đãi" />
          <CategoryCard icon={<CreditCard className="w-6 h-6 text-[#ee4d2d]" />} title="Thanh Toán" />
          <CategoryCard icon={<Truck className="w-6 h-6 text-[#ee4d2d]" />} title="Đơn Hàng & Vận Chuyển" />
          <CategoryCard icon={<RefreshCcw className="w-6 h-6 text-[#ee4d2d]" />} title="Trả Hàng & Hoàn Tiền" />
          <CategoryCard icon={<Info className="w-6 h-6 text-[#ee4d2d]" />} title="Thông Tin Chung" />
        </div>

        {/* FAQs */}
        <h2 className="text-xl font-medium mb-4">Câu hỏi thường gặp</h2>
        <div className="space-y-4">
          <FaqItem title="[Cảnh báo lừa đảo] Mua sắm an toàn cùng Style Nest" />
          <FaqItem title="[Trả hàng] Cách đóng gói đơn hàng hoàn trả" />
          <FaqItem title="[Trả hàng/Hoàn tiền] Hướng dẫn trả hàng sau khi yêu cầu Trả hàng/Hoàn tiền của bạn được chấp nhận" />
          <FaqItem title="[Thành viên mới] Điều kiện Trả hàng/Hoàn tiền của Style Nest" />
          <FaqItem title="[Lỗi] Tại sao tài khoản Style Nest của tôi bị khóa/bị giới hạn?" />
          <FaqItem title="[Tài khoản Style Nest] Tôi không thể đặt hàng/đăng ký/đăng nhập tài khoản do số điện thoại đã tồn tại" />
        </div>
      </div>
    </div>
  )
}

function CategoryCard({ icon, title }) {
  return (
    <div className="border border-gray-200 rounded-md p-4 flex items-center space-x-4 hover:shadow-md transition cursor-pointer">
      <div className="flex-shrink-0">{icon}</div>
      <div className="font-medium">{title}</div>
    </div>
  )
}

function FaqItem({ title }) {
  return (
    <div className="border-b border-gray-200 pb-4 hover:text-[#ee4d2d] cursor-pointer">
      <p>{title}</p>
    </div>
  )
}
