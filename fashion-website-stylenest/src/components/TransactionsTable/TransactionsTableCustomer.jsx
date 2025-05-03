import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

const TransactionsTableCustomer = ({ customers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const itemsPerPage = 6
    const paginatedCustomers = customers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const totalPages = Math.ceil(customers.length / itemsPerPage)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
    const handlePageClick = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page)
        console.log(`Navigating to page ${page}`)
      }
    }
  
    const toggleDropdown = (customers, event) => {
      event.preventDefault()
      event.stopPropagation()
  
      if (selectedCustomers?.id === customers.id && dropdownOpen) {
        setDropdownOpen(false)
        setSelectedCustomers(null)
      } else {
        const rect = event.currentTarget.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX - 100,
        })
        setSelectedCustomers(customers)
        setDropdownOpen(true)
      }
    }

    // Format ngày
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date)
    }

    const handleSaveChanges = () => {
      setIsModalOpen(false);
    };
  
    const handleClickOutside = () => {
      setDropdownOpen(false)
      setSelectedCustomers(null)
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
          <h1 className="text-2xl font-bold text-gray-600">Danh sách khách hàng</h1>
          <div className="relative flex items-center w-full max-w-lg gap-2 mx-4">
            {/* Ô nhập tìm kiếm */}
            <div className="flex flex-grow items-center border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
                <i className="bx bx-search-alt text-gray-500 text-xl mr-2"></i>
                <input
                type="text"
                placeholder="Tìm kiếm hoặc gõ lệnh..."
                className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
            </div>

            {/* Nút tìm kiếm */}
            <button className="px-4 py-2 bg-white text-gray-600 text-sm border border-gray-300 rounded-lg shadow-sm transition">
                Tìm kiếm
            </button>
            </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-4 pl-4 font-medium text-gray-500">Khách hàng</th>
                <th className="text-left pb-4 font-medium text-gray-500">Giới tính</th>
                <th className="text-left pb-4 font-medium text-gray-500">Ngày sinh</th>
                <th className="text-left pb-4 font-medium text-gray-500">Email</th>
                <th className="text-left pb-4 font-medium text-gray-500">Số điện thoại</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customers) => (
                <tr key={customers.id} className="border-b border-gray-200 h-16">
                  <td className="py-4 pl-4">
                    <div className="flex items-center">
                      <div
                        className={"text-white w-10 h-10 rounded-full flex items-center justify-center mr-3"}
                      >
                        <img src={customers.img} alt={customers.customerName} className="w-10 h-10 rounded-full"/>
                      </div>
                      <span className="font-medium text-center">{customers.customerName}</span>
                    </div>
                  </td>
                  <td className="text-gray-500">{customers.gender}</td>
                  <td className="text-gray-500">{formatDate(customers.date)}</td>
                  <td className="font-medium">{customers.email}</td>
                  <td className="text-gray-500">{customers.phone}</td>
                  <td>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={(e) => toggleDropdown(customers, e)}
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
  
        {dropdownOpen && setSelectedCustomers && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-40 z-50"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <button
                onClick={() => {
                    console.log(`View more details for customers: ${setSelectedCustomers.id}`)
                    setDropdownOpen(false)
                    setIsModalOpen(true)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                Sửa
            </button>
            <button
                onClick={() => {
                    console.log(`Delete customers: ${setSelectedCustomers.id}`)
                    setDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
                Xóa
            </button>
          </div>
        )}

        {isModalOpen && selectedCustomers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn space-y-6">

              {/* Hình ảnh + Upload */}
              <div className="flex items-center gap-6">
                <img
                  src={selectedCustomers.img}
                  alt={selectedCustomers.customerName}
                  className="w-32 h-32 rounded-lg border object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imgURL = URL.createObjectURL(file);
                      // Cập nhật preview nếu cần
                    }
                  }}
                  className="text-base text-gray-700"
                />
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* Tên khách hàng */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Tên khách hàng</label>
                  <input
                    type="text"
                    value={selectedCustomers.customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Giới tính */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Giới tính</label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={selectedCustomers.gender === "Nam"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Nam
                    </label>
                    <label className="flex items-center gap-2 text-base">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={selectedCustomers.gender === "Nữ"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Nữ
                    </label>
                  </div>
                </div>

                {/* Ngày sinh */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    value={selectedCustomers.date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={selectedCustomers.phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={selectedCustomers.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Nút lưu / đóng */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleSaveChanges}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition font-medium"
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

export default TransactionsTableCustomer
