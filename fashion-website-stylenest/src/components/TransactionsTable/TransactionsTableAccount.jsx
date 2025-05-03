import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

const TransactionsTableAccount = ({ accounts }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedorders, setSelectedorders] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("customer");
  
    const itemsPerPage = 6
    const paginatedorderss = accounts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const totalPages = Math.ceil(accounts.length / itemsPerPage)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
    const handlePageClick = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page)
        console.log(`Navigating to page ${page}`)
      }
    }
  
    const toggleDropdown = (accounts, event) => {
      event.preventDefault()
      event.stopPropagation()
  
      if (selectedorders?.id === accounts.id && dropdownOpen) {
        setDropdownOpen(false)
        setSelectedorders(null)
      } else {
        const rect = event.currentTarget.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX - 100,
        })
        setSelectedorders(accounts)
        setDropdownOpen(true)
      }
    }

    const handleSaveChanges = () => {
      setIsModalOpen(false);
    };

    const handleClickOutside = () => {
      setDropdownOpen(false)
      setSelectedorders(null)
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
          <h1 className="text-2xl font-bold text-gray-600">Danh sách tài khoản</h1>
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
                <th className="text-left pb-4 pl-4 font-medium text-gray-500">Tài khoản</th>
                <th className="text-left pb-4 font-medium text-gray-500">Mật khẩu</th>
                <th className="text-left pb-4 font-medium text-gray-500">Email</th>
                <th className="text-left pb-4 font-medium text-gray-500">Quyền</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedorderss.map((accounts) => (
                <tr key={accounts.id} className="border-b border-gray-200 h-16">
                  <td className="pl-4 text-gray-500">{accounts.userName}</td>
                  <td className="text-gray-500">{accounts.password}</td>
                  <td className="font-medium">{accounts.email}</td>
                  <td className="text-gray-500">{accounts.role == "customer" ? "Khách hàng" : "admin"}</td>
                  <td>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={(e) => toggleDropdown(accounts, e)}
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
  
        {dropdownOpen && selectedorders && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-40 z-50"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <button
                onClick={() => {
                    console.log(`View more details for accounts: ${selectedorders.id}`)
                    setDropdownOpen(false)
                    setIsModalOpen(true)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                Sửa
            </button>
            <button
                onClick={() => {
                    console.log(`Delete accounts: ${selectedorders.id}`)
                    setDropdownOpen(false)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
                Xóa
            </button>
          </div>
        )}

        {isModalOpen && selectedorders && (
          <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
            {/* Nền mờ và hiệu ứng mờ nền */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Hộp nội dung modal */}
            <div className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-fadeIn transition-all duration-300 z-50">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Chi tiết tài khoản</h2>

              {/* Form nội dung */}
              <div className="space-y-5">
                {/* Tên tài khoản */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Tên tài khoản</label>
                  <input
                    type="text"
                    value={selectedorders.userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mật khẩu */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Mật khẩu</label>
                  <input
                    type="password"
                    value={selectedorders.password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={selectedorders.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quyền */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Quyền</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="customer">Khách hàng</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Nút hành động */}
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => handleSaveChanges()}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Lưu
                </button>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
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

export default TransactionsTableAccount
