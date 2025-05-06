import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import ModalAddProduct from '../Modal/ModalAddProduct'
import ModalProductEdit from "../Modal/ModalProductEdit"

const TransactionsTableProduct = ({ products, saveProduct, updateProduct, deleteProduct }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProducts, setSelectedProducts] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModaAddlOpen] = useState(false);
    const [isModalEditOpen, setIsModaEditOpen] = useState(false);

    const itemsPerPage = 6
    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const totalPages = Math.ceil(products.length / itemsPerPage)
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
    const handlePageClick = (page) => {
      if (typeof page === "number") {
        setCurrentPage(page)
        console.log(`Navigating to page ${page}`)
      }
    }
  
    const toggleDropdown = (products, event) => {
      event.preventDefault()
      event.stopPropagation()
  
      if (selectedProducts?.id === products.id && dropdownOpen) {
        setDropdownOpen(false)
        setSelectedProducts(null)
      } else {
        const rect = event.currentTarget.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX - 100,
        })
        setSelectedProducts(products)
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

    // Format tiền VNĐ
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount)
    }

    const changeColor = (status) => {
      switch (status) {
        case true:
          return "bg-green-500 text-white text-xs font-medium px-2 py-1 rounded"
        default:
          return ""
      }
    }
  
    const handleClickOutside = () => {
      setDropdownOpen(false)
      setSelectedProducts(null)
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
          <h1 className="text-2xl font-bold text-gray-600">Danh sách sản phẩm</h1>
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

            <button className="px-4 py-2 bg-white text-gray-600 text-sm border border-gray-300 rounded-lg shadow-sm transition"
              onClick={() => setIsModaAddlOpen(true)}
            >
                Thêm sản phẩm
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-4 pl-4 font-medium text-gray-500">Sản phẩm</th>
                <th className="text-left pb-4 font-medium text-gray-500">Ngày nhập</th>
                <th className="text-left pb-4 font-medium text-gray-500">Thương hiệu</th>
                <th className="text-left pb-4 font-medium text-gray-500">Giảm giá</th>
                <th className="text-left pb-4 font-medium text-gray-500">Giá tiền</th>
                <th className="text-left pb-4 font-medium text-gray-500">Trạng thái</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((products) => (
                <tr key={products.id} className="border-b border-gray-200 h-16">
                  <td className="py-4 pl-4">
                    <div className="flex items-center">
                      <div
                        className={"text-white w-10 h-10 rounded-full flex items-center justify-center mr-3"}
                      >
                        <img src={products.thumbnails[0]} alt={products.name} className="w-10 h-10 rounded-full"/>
                      </div>
                      <span className="font-medium text-center">{products.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-500">{formatDate(products.dateAdded)}</td>
                  <td className="text-gray-500">{products.brand}</td>
                  <td className="text-gray-500">{products.discount}%</td>
                  <td className="text-gray-500">{formatCurrency(products.price * (1 - products.discount / 100))}</td>
                  <td>
                    <span className={`px-4 py-2 rounded-full text-sm ${changeColor(products.condition)}`}>
                      {products.condition ? "Hàng mới": "Hàng cũ"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={(e) => toggleDropdown(products, e)}
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
  
        {dropdownOpen && selectedProducts && (
          <div
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-40 z-50"
            style={{ top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
            <button
                onClick={() => {
                    console.log(`View more details for products: ${selectedProducts.id}`)
                    setDropdownOpen(false)
                    setIsModalOpen(true)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                Xem thêm chi tiết
            </button>
            <button
                onClick={() => {
                    console.log(`View more details for products: ${selectedProducts.id}`)
                    setDropdownOpen(false)
                    setIsModaEditOpen(true)
                    console.log("Edit products: ", selectedProducts)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                Sửa
            </button>
            <button
                onClick={() => {
                    console.log(`Delete products: ${selectedProducts.id}`)
                    setDropdownOpen(false)
                    deleteProduct(selectedProducts.id)
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
                Xóa
            </button>
          </div>
        )}

        {isModalOpen && selectedProducts && (
          <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
            {/* Nền mờ */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Hộp nội dung */}
            <div className="relative bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn transition-transform duration-300">
              {/* Tiêu đề */}
              <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
                Chi tiết sản phẩm: <span>{selectedProducts.name}</span>
              </h2>

              {/* Slogan và mô tả ngắn */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-lg text-gray-800">{selectedProducts.name}</p>
                  <p className="text-base text-gray-500">{selectedProducts.slogan}</p>
                </div>
              </div>

              {/* Hình ảnh sản phẩm */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Hình ảnh sản phẩm</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProducts.thumbnails.map((item, index) => (
                    <li
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white"
                    >
                      <img
                        src={item}
                        alt={`${selectedProducts.name} ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-sm sm:text-base mb-6">
                <p><strong>Thương hiệu:</strong> {selectedProducts.brand}</p>
                <p><strong>Ngày nhập:</strong> {formatDate(selectedProducts.dateAdded)}</p>
                <p><strong>Loại:</strong> {selectedProducts.type}</p>
                <p><strong>Giảm giá:</strong> {selectedProducts.discount}%</p>
                <p><strong>Giá tiền:</strong> {formatCurrency(selectedProducts.price)}</p>
                <p><strong>Màu sắc:</strong> {selectedProducts.colors}</p>
                <p><strong>Kích thước:</strong> {selectedProducts.size}</p>
                <p><strong>Trạng thái:</strong> {selectedProducts.condition ? "Hàng mới" : "Hàng cũ"}</p>
                <p><strong>SKU:</strong> {selectedProducts.SKU}</p>
                <p><strong>Đánh giá:</strong> {selectedProducts.rating} ⭐</p>
                <p><strong>Tồn kho:</strong> {selectedProducts.instock}</p>
              </div>

              {/* Mô tả sản phẩm */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Mô tả chi tiết</h3>
                <ul className="space-y-4">
                  {selectedProducts.descriptions.map((item, index) => (
                    <li
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                    >
                      <p className="font-medium text-justify">{item.title}</p>
                      <p className="text-gray-600 text-justify">{item.content}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chi tiết vật liệu */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Thông tin sản xuất</h3>
                <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm text-sm sm:text-base text-gray-700 space-y-2 text-justify">
                  <p><strong>Vật liệu:</strong> {selectedProducts.details.material}</p>
                  <p><strong>Vải vóc:</strong> {selectedProducts.details.fabric}</p>
                  <p><strong>Xuất xứ:</strong> {selectedProducts.details.origin}</p>
                  <p><strong>Hướng dẫn bảo quản:</strong> {selectedProducts.details.careInstructions}</p>
                </div>
              </div>

              {/* Nút đóng */}
              <div className="text-right">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition shadow-md"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalAddOpen &&
          <ModalAddProduct 
            isOpen={isModalAddOpen}
            onClose={() => setIsModaAddlOpen(false)}
            saveProduct={saveProduct}
            products={products}
          />
        }

        {isModalEditOpen && selectedProducts && 
          <ModalProductEdit
            isOpen={isModalEditOpen}
            onClose={() => setIsModaEditOpen(false)}
            product={selectedProducts}
            updateProduct={updateProduct}
          />
        }
      </div>
    )
}

export default TransactionsTableProduct
