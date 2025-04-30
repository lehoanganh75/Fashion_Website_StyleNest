import { useState } from "react"
import 'boxicons/css/boxicons.min.css'

const ShoppingCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "AlRism Áo Hoodie Chống UV Kéo Khóa",
      color: "10 PINK",
      size: "Nữ S",
      description: "Chất liệu tái chế",
      price: 588000,
      quantity: 1,
      selected: true,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Quần Jean Ống Suông Cao Cấp",
      color: "32 BEIGE",
      size: "Nữ M",
      description: "",
      price: 799000,
      quantity: 1,
      selected: true,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const [allSelected, setAllSelected] = useState(true)

  const toggleSelectAll = () => {
    const newSelected = !allSelected
    setAllSelected(newSelected)
    setItems(items.map((item) => ({ ...item, selected: newSelected })))
  }

  const toggleSelectItem = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
    setItems(newItems)
    setAllSelected(newItems.every((item) => item.selected))
  }

  const incrementQuantity = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decrementQuantity = (id) => {
    setItems(items.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ))
  }

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () =>
    items.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0)

  const calculateTax = () => calculateSubtotal() * 0.08

  const calculateTotal = () => calculateSubtotal() + calculateTax()

  const selectedCount = items.filter((item) => item.selected).length

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col gap-8 w-[90%]">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng</h1>

          {items.length === 0 ? (
            <p className="text-center text-lg text-gray-500">Giỏ hàng của bạn hiện tại trống.</p>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-gray-800 border-gray-300 rounded"
                  aria-label="Chọn tất cả"
                />
                <label htmlFor="select-all" className="ml-3 text-[18px] text-gray-700">Chọn tất cả</label>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-5 border border-gray-300 rounded-xl p-4 hover:shadow-md transition">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 text-gray-800 border-gray-300 rounded"
                      aria-label={`Chọn ${item.name}`}
                    />
                    <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-lg border" />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-semibold text-gray-800 pb-2 truncate w-4/5">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-gray-800 text-xl font-bold" aria-label={`Xóa ${item.name}`}>
                          <i className="bx bx-x text-2xl"></i>
                        </button>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Màu: {item.color}</p>
                        <p className="text-sm py-2 text-gray-500">Kích cỡ: {item.size}</p>
                        {item.description && <p className="text-sm text-gray-500">Mô tả: {item.description}</p>}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center justify-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="px-3 text-sm font-semibold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="px-2 py-1 text-sm text-gray-700 hover:bg-gray-200 transition duration-200 ease-in-out"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-[18px] font-semibold text-gray-600 mt-1 text-center">
                        {(item.price * item.quantity).toLocaleString("vi-VN")} VND
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Tổng tiền hóa đơn</h2>

              <div className="text-sm text-gray-600 space-y-4">
                <div className="flex justify-between items-center pb-3">
                  <span className="text-[18px] font-medium">Tạm tính ({selectedCount} sản phẩm)</span>
                  <span className="text-[18px] font-semibold text-gray-800">{calculateSubtotal().toLocaleString("vi-VN")} VND</span>
                </div>

                <div className="flex justify-between items-center pb-3">
                  <span className="text-[18px] font-medium">Thuế GTGT (8%)</span>
                  <span className="text-[18px] font-semibold text-gray-800">{calculateTax().toLocaleString("vi-VN")} VND</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-xl font-semibold text-gray-900">
                  <span className="text-lg">Tổng thanh toán</span>
                  <span className="text-lg text-gray-600 font-bold">{calculateTotal().toLocaleString("vi-VN")} VND</span>
                </div>
              </div>

              <button
                disabled={selectedCount === 0}
                className={`mt-6 w-full py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ease-in-out ${selectedCount === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-gray-500 to-gray-500 hover:opacity-90"}`}
              >
                Thanh toán
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
