import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"

const TransactionsTableCustomer = ({ customers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");  // State tìm kiếm
    const [customerName, setCustomerName] = useState("");
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const itemsPerPage = 6;
    
    // Lọc khách hàng dựa trên số điện thoại và tên (có thể thêm các trường khác)
    const filteredCustomers = customers.filter(customer => 
        customer.phone.includes(searchQuery) || customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    const handlePageClick = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page);
        console.log(`Navigating to page ${page}`);
      }
    }
  
    const toggleDropdown = (customers, event) => {
      event.preventDefault();
      event.stopPropagation();
  
      if (selectedCustomers?.id === customers.id && dropdownOpen) {
        setDropdownOpen(false);
        setSelectedCustomers(null);
      } else {
        const rect = event.currentTarget.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX - 100,
        });
        setSelectedCustomers(customers);
        setDropdownOpen(true);
      }
    }

    // Format ngày
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    }

    const handleSaveChanges = () => {
      setIsModalOpen(false);
    };
  
    const handleClickOutside = () => {
      setDropdownOpen(false);
      setSelectedCustomers(null);
    }
  
    useEffect(() => {
      if (dropdownOpen) {
        document.addEventListener("click", handleClickOutside);
      }
      return () => {
        document.removeEventListener("click", handleClickOutside);
      }
    }, [dropdownOpen]);
  
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
                <th className="text-left pb-4 font-medium text-gray-500">Giới tính</th>
                <th className="text-left pb-4 font-medium text-gray-500">Ngày sinh</th>
                <th className="text-left pb-4 font-medium text-gray-500">Email</th>
                <th className="text-left pb-4 font-medium text-gray-500">Số điện thoại</th>
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
                );
              } else if (page === 4 && currentPage < 4) {
                return (
                  <button key={index} className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600">
                    ...
                  </button>
                );
              }
              return null;
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
      </div>
    )
}

export default TransactionsTableCustomer;
