import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

const TransactionsTableOrder = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedOrders, setSelectedOrders] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 6

    const totalPages = Math.ceil(orders.length / itemsPerPage)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
    const handlePageClick = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page)
        console.log(`Navigating to page ${page}`)
      }
    }
    const filteredOrders = orders.filter(order => 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const paginatedOrders = filteredOrders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
    
  
    const toggleDropdown = (orders, event) => {
      event.preventDefault()
      event.stopPropagation()
  
      if (selectedOrders?.id === orders.id && dropdownOpen) {
        setDropdownOpen(false)
        setSelectedOrders(null)
      } else {
        const rect = event.currentTarget.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX - 100,
        })
        setSelectedOrders(orders)
        setDropdownOpen(true)
      }
    }

    // Format ngày
    const formatDate = (dateString) => {
      if (!dateString) {
        console.error('Invalid date string:', dateString);
        return dateString;
      }
    
      // Tách phần giờ và ngày
      const [time, date] = dateString.split(' ');
    
      if (!date) {
        console.error('Invalid date format:', dateString);
        return dateString;
      }
    
      // Tách ngày, tháng, năm từ chuỗi ngày
      const [day, month, year] = date.split('/');
    
      // Kiểm tra nếu day, month, hoặc year bị thiếu hoặc không hợp lệ
      if (!day || !month || !year) {
        console.error('Invalid day/month/year format:', dateString);
        return dateString;
      }
    
      // Đảm bảo rằng day và month là số có 2 chữ số
      const paddedDay = day.padStart(2, '0');
      const paddedMonth = month.padStart(2, '0');
    
      // Chuyển đổi ngày thành định dạng yyyy-mm-dd
      const formattedDate = `${year}-${paddedMonth}-${paddedDay}T${time}`;
    
      // Tạo đối tượng Date
      const dateObject = new Date(formattedDate);
    
      if (isNaN(dateObject)) {
        console.error('Invalid date object:', dateString);
        return dateString;
      }
    
      // Định dạng lại ngày theo "vi-VN"
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(dateObject);
    }
    

    // Format tiền VNĐ
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
    }
  
    const handleClickOutside = () => {
      setDropdownOpen(false)
      setSelectedOrders(null)
    }

    const changeColor = (status) => {
      switch (status) {
        case "Đã thanh toán":
          return "bg-green-100 text-green-600"
        case "Chưa thanh toán":
          return "bg-yellow-100 text-yellow-600"
        case "Đang xử lý":
          return "bg-blue-100 text-blue-600"
        case "Đã hủy":
          return "bg-red-100 text-red-600"
        case "Đã giao":
          return "bg-green-100 text-green-600"
        case "Đang kiểm tra":
          return "bg-green-100 text-green-600"
        default:
          return ""
      }
    }
  
    useEffect(() => {
      if (dropdownOpen) {
        document.addEventListener("click", handleClickOutside)
      }
      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    }, [dropdownOpen])
  
    return (
      <div className="bg-white border border-gray-300 p-4.5 rounded-lg shadow-sm max-w-full font-['Roboto']">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-600">Hóa đơn mới nhất</h1>
          <div className="relative flex items-center w-full max-w-lg gap-2 mx-4">
            {/* Ô nhập tìm kiếm */}
            <div className="flex flex-grow items-center border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
                <i className="bx bx-search-alt text-gray-500 text-xl mr-2"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm hoặc gõ lệnh..."
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}  // Cập nhật state khi người dùng nhập
                />
            </div>

            {/* Nút tìm kiếm */}
            <button className="px-4 py-2 bg-white text-gray-600 text-sm border border-gray-300 rounded-lg shadow-sm transition hover:cursor-pointer hover:scale-102">
                Tìm kiếm
            </button>
            </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-4 pl-4 font-medium text-gray-500">Khách hàng</th>
                <th className="text-left pb-4 font-medium text-gray-500">Ngày thanh toán</th>
                <th className="text-left pb-4 font-medium text-gray-500">Giá tiền</th>
                <th className="text-left pb-4 font-medium text-gray-500">Email</th>
                <th className="text-left pb-4 font-medium text-gray-500">Trạng thái</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((orders) => (
                <tr key={orders.id} className="border-b border-gray-200 h-16">
                  <td className="py-4 pl-4">
                    <div className="flex items-center">
                      <div
                        className={"text-white w-10 h-10 rounded-full flex items-center justify-center mr-3"}
                      >
                        <img src={orders.img} alt={orders.customerName} className="w-10 h-10 rounded-full"/>
                      </div>
                      <span className="font-medium text-center">{orders.customerName}</span>
                    </div>
                  </td>
                  <td className="text-gray-500">{formatDate(orders.timeline[0].orderDate)}</td>
                  <td className="font-medium">{formatCurrency(orders.total)}</td>
                  <td className="text-gray-500">{orders.email}</td>
                  <td>
                    <span className={`px-4 py-2 rounded-full text-sm ${changeColor(orders.timeline[0].status)}`}>
                      {orders.timeline[0].status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={(e) => toggleDropdown(orders, e)}
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="flex justify-between items-center mt-6">
          <button
            className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Trước
          </button>
  
          <div className="flex space-x-1">
            {pages.map((page, index) => {
              // Only show pages 1, 2, 3, ellipsis, and last 3 pages
              if (page <= 3 || page >= pages.length - 2 || page === currentPage) {
                return (
                  <button
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      page === currentPage ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )
              } else if (page === 4 && currentPage < 4) {
                // Show ellipsis between 3 and 8
                return (
                  <button key={index} className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600">
                    ...
                  </button>
                )
              }
              // Hide other pages
              return null
            })}
          </div>
  
          <button
            className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
            onClick={() => currentPage < 10 && handlePageClick(currentPage + 1)}
          >
            Sau
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
  
        {dropdownOpen && selectedOrders && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-40 z-50"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <button
                onClick={() => {
                    console.log(`View more details for orders: ${selectedOrders.id}`)
                    setDropdownOpen(false)
                    setIsModalOpen(true)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                Xem thêm chi tiết
            </button>
          </div>
        )}

        {isModalOpen && selectedOrders && (
          <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
            {/* Nền mờ phía sau với hiệu ứng blur */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Hộp nội dung modal */}
            <div className="relative bg-white border border-gray-200 p-6 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn scale-100 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">Chi tiết đơn hàng</h2>

              <div className="flex items-center gap-4 mb-6">
                <img src={selectedOrders.img} alt={selectedOrders.customerName} className="w-16 h-16 rounded-full shadow" />
                <div className="text-gray-800">
                  <p className="font-semibold text-lg">{selectedOrders.customerName}</p>
                  <p className="text-gray-500 text-sm">{selectedOrders.email}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <p><strong>Địa chỉ:</strong> {selectedOrders.address}</p>
                <p><strong>Ngày đặt hàng:</strong> {formatDate(selectedOrders.timeline[0].orderDate)}</p>
                <p><strong>Trạng thái:</strong> {selectedOrders.timeline[0].status}</p>
                <p><strong>Tổng tiền:</strong> {selectedOrders.total.toLocaleString()}₫</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Sản phẩm đã đặt:</h3>
                <ul className="space-y-4">
                  {selectedOrders.orderDetails.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 border border-gray-300 rounded-md p-4 bg-white shadow-sm"
                    >
                      <img src={item.img} alt={item.productName} className="w-34 h-34 border border-gray-300 rounded object-cover shadow" />
                      <div className="text-gray-700 text-sm md:text-base">
                        <p className="font-medium">{item.productName}</p>
                        <p className="py-2">Số lượng: {item.quantity}</p>
                        <p>Đơn giá: {item.price.toLocaleString()}₫</p>
                        <p className="py-2">Tổng: {item.total.toLocaleString()}₫</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default TransactionsTableOrder
