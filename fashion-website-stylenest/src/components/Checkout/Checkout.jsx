import { useState, useEffect } from "react"
import { MapPin, Ticket, CheckCircle, ChevronRight, Info, X, Plus } from "lucide-react"
import { useCart } from "../../contexts/CartContext"
import { useData } from "../../contexts/DataContext"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
  const [note, setNote] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod")
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [showNewAddressModal, setShowNewAddressModal] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const { saveOrders, cartItemSelected } = useCart();
  const { customers, orders, updateCustomer } = useData();
  const { loggedInAccount } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [customer , setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomerData = async () => {
      // Kiểm tra dữ liệu có hợp lệ không
      if (!loggedInAccount?.email || !Array.isArray(customers)) return;

      setIsLoading(true); // Đánh dấu bắt đầu tải dữ liệu

      try {
        // Tìm khách hàng từ danh sách customers
        const matchedCustomer = customers.find(customer => customer.email === loggedInAccount.email);
        setCustomer(matchedCustomer);

        if (matchedCustomer) {
          const addrList = matchedCustomer.address || [];
          setAddresses(addrList);

          // Chọn địa chỉ mặc định nếu có
          const defaultAddr = addrList.find(addr => addr.isDefault);
          setSelectedAddress(defaultAddr || addrList[0] || null);
        } else {
          setAddresses([]);
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
      } finally {
        setIsLoading(false); // Đánh dấu kết thúc tải dữ liệu
      }
    };

    loadCustomerData();
  }, [customers, loggedInAccount]); 

  const [tempSelectedAddress, setTempSelectedAddress] = useState(null)

  const [newAddressForm, setNewAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    addressType: "home", 
    isDefault: false,
  })

  const handleNewAddressChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewAddressForm({
      ...newAddressForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddNewAddress = () => {
    const newAddress = {
      id: String(addresses.length + 1),
      name: newAddressForm.name,
      phone: newAddressForm.phone,
      address: newAddressForm.detailAddress,
      addressType: newAddressForm.addressType,
      isDefault: newAddressForm.isDefault,
    }

    let updatedAddresses = [...addresses]
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }))
    }

    const newAddresses = [...updatedAddresses, newAddress]
    setAddresses(newAddresses)

    if (newAddress.isDefault) {
      setSelectedAddress(newAddress)
      setTempSelectedAddress(newAddress)
    }

    setNewAddressForm({
      name: "",
      phone: "",
      location: "",
      address: "",
      addressType: "home",
      isDefault: false,
    })
    setShowNewAddressModal(false);
  }

  const openNewAddressModal = () => {
    setShowAddressModal(false)
    setShowNewAddressModal(true)
  }

  const closeNewAddressModal = () => {
    setShowNewAddressModal(false) 
    setShowAddressModal(true) 
  }

  const selectAddress = (address) => {
    setTempSelectedAddress(address)
  }

  const confirmAddressSelection = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress)
    }
    setShowAddressModal(false)
    setTempSelectedAddress(null)
  }

  useEffect(() => {
    if (showAddressModal) {
      setTempSelectedAddress(selectedAddress)
    }
  }, [showAddressModal, selectedAddress])

  const setAddressAsDefault = (addressId, e) => {
    e.stopPropagation() 

    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }))

    setAddresses(updatedAddresses)

    const defaultAddress = updatedAddresses.find((addr) => addr.id === addressId)

    if (tempSelectedAddress && tempSelectedAddress.id === addressId) {
      setTempSelectedAddress(defaultAddress)
    }
    if (selectedAddress && selectedAddress.id === addressId) {
      setSelectedAddress(defaultAddress)
    }
  }

  const handleEditAddress = (addr, e) => {
    e.stopPropagation();
    setEditingAddressId(addr.id);
    setEditForm({ name: addr.name, phone: addr.phone, address: addr.address });
  };

  const handleDeleteAddress = (addrId, e) => {
    e.stopPropagation();
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
    if (confirmed) {
      setAddresses((prev) => prev.filter((a) => a.id !== addrId));
      if (tempSelectedAddress?.id === addrId) {
        setTempSelectedAddress(null);
      }
    }
  };

  const calculateSubtotal = () =>
    cartItemSelected.reduce((total, item) => total + item.price * (1 - item.discount / 100) * item.quantity, 0);

  const calculateTax = () => calculateSubtotal() * 0.08;

  const calculateTotal = () => calculateSubtotal() + calculateTax();
 
  const handleCheckout = () => {
    // Kiểm tra xem đã có thông tin khách hàng và địa chỉ chưa
    if (isLoading) {
      console.log("Dữ liệu đang được tải, vui lòng đợi...");
      return;
    }

    if (!customer?.id || !selectedAddress) {
      console.error("Không tìm thấy thông tin khách hàng hoặc địa chỉ.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });

    console.log("Khách hàng đã cập nhật: ", customer);
    console.log("Khách hàng địa chỉ: ", addresses);

    try {
      // Cập nhật khách hàng
      updateCustomer(String(customer.id), addresses);

      const newOrder = {
        id: String(Math.max(...orders.map((a) => parseInt(a.id) || 0), 0) + 1),
        email: loggedInAccount.email,
        phone: selectedAddress.phone,
        customerName: selectedAddress.name,
        total: calculateTotal(),
        address: selectedAddress.address,
        orderDetails: cartItemSelected.map((item) => ({
          productId: item.id,
          productName: item.name,
          size: item.selectedSize,
          color: item.selectedColor,
          quantity: item.quantity,
          price: item.price * (1 - item.discount / 100),
          total: item.price * item.quantity * (1 - item.discount / 100),
          img: item.thumbnails[0]
        })),
        paymentMethod: "Thanh toán khi nhận hàng",
        timeline: [
          {
            status: "Đang kiểm tra",
            orderDate: formattedDate
          }
        ]
      };

      console.log("Sản phẩm mới: ", newOrder);
      // Lưu đơn hàng
      saveOrders(newOrder);

      cartItemSelected.length = 0; // Xóa giỏ hàng

      navigate("/order-tracking");
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán:", error);
    }
  };

  // Hiển thị thông báo khi dữ liệu chưa tải xong
  if (isLoading) {
    return <div>Đang tải dữ liệu khách hàng...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-4xl font-['Roboto'] space-y-6">
        
        {/* Địa chỉ nhận hàng */}
        <div className="px-6 py-4">
          <div className="flex items-start gap-4">
            <MapPin className="text-red-500 h-6 w-6 mt-1" />
            <div className="flex-1">
              <h2 className="text-red-500 text-lg font-semibold">Địa Chỉ Nhận Hàng</h2>

              {selectedAddress ? (
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">{selectedAddress.name}</p>
                    <p className="text-gray-600 mb-2">{selectedAddress.phone}</p>
                    <p className="text-gray-600 text-sm">{selectedAddress.address}</p>
                  </div>
                  <div className="flex gap-4">
                    {selectedAddress.isDefault && (
                      <span className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm">Mặc Định</span>
                    )}
                    <button className="text-gray-600 font-medium" onClick={() => setShowAddressModal(true)}>
                      Thay Đổi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center pt-2">
                  <p className="text-gray-600 text-sm italic">Bạn chưa có địa chỉ nhận hàng. Vui lòng cập nhật thông tin.</p>
                  <button className="text-gray-600 font-medium" onClick={() => setShowAddressModal(true)}>
                    Thêm Địa Chỉ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-12 gap-4 pb-2 border-b text-base font-medium text-gray-800">
            <div className="col-span-6">Sản phẩm</div>
            <div className="col-span-2 text-right">Đơn giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-right">Thành tiền</div>
          </div>

          {cartItemSelected.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 border-b text-gray-700">
              <div className="col-span-6 flex items-center gap-3">
                <img src={item.thumbnails[0]} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-gray-100" />
                <p className="text-sm">{item.name}</p>
              </div>
              <div className="col-span-2 text-right text-sm">{(item.price * (1 - item.discount/100)).toLocaleString()} đ</div>
              <div className="col-span-2 text-center text-sm">{item.quantity}</div>
              <div className="col-span-2 text-right font-semibold">{(item.price * (1 - item.discount/100) * item.quantity).toLocaleString()} đ</div>
            </div>
          ))}
        </div>

        {/* Note & Shipping */}
        <div className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
          <label className="col-span-3 text-gray-600">Lời nhắn:</label>
          <div className="col-span-9">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Lưu ý cho Người bán..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        {/* Shipping Method */}
        <div className="px-6 py-4 grid grid-cols-12 gap-4 text-gray-800">
          <div className="col-span-3 font-medium">Phương thức vận chuyển:</div>
          <div className="col-span-7 space-y-4">
            <div>
              <div className="flex items-center">
                <span className="font-medium">Nhanh</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Nhận hàng từ 8–9 Tháng 5</p>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                Nhận voucher ₫15.000 nếu giao sau 9 Tháng 5 2025
                <Info className="h-4 w-4 ml-1 text-gray-800" />
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                Hoặc chọn Hỏa Tốc để{" "}
                <br />
                <button className="text-teal-500 font-medium inline-flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  nhận hôm nay
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </p>
            </div>
          </div>
          <div className="col-span-2 text-right font-medium">₫32.800</div>
        </div>

        {/* Payment & Summary */}
        <div className="px-6 py-4 space-y-6 text-gray-800">
          <div>
            <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>
            <div className="flex space-x-4">
              {["credit","googlepay","cod"].map((method) => (
                <button
                  key={method}
                  className={`border rounded px-4 py-2 text-sm ${selectedPaymentMethod===method ? "border-red-500 text-red-500" : "hover:border-blue-500"}`}
                  onClick={() => setSelectedPaymentMethod(method)}
                >
                  {{
                    credit: "Thẻ Tín dụng",
                    googlepay: "Google Pay",
                    cod: "Thanh toán khi nhận"
                  }[method]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 border-t border-b py-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền hàng</span>
              <span>{new Intl.NumberFormat('vi-VN').format(calculateSubtotal())} đ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span>{new Intl.NumberFormat('vi-VN').format(calculateTax())} đ</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tổng thanh toán</span>
            <span className="text-2xl font-bold text-red-500">
              {new Intl.NumberFormat('vi-VN').format(calculateTotal())} đ
            </span>
          </div>
        </div>

        {/* Terms & Place Order */}
        <div className="px-6 py-4 flex justify-between items-center text-sm text-gray-600">
          <p>
            Khi nhấn <span className="font-medium">'Đặt hàng'</span>, bạn đồng ý
            với <a href="#" className="text-blue-500">Điều khoản StyleNest</a>.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded"
            onClick={handleCheckout}
          >
            Đặt hàng
          </button>
        </div>

      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-['Rboto']">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal content */}
          <div className="relative bg-white border border-gray-200 p-6 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 z-10 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Địa chỉ của tôi</h2>
              <button onClick={() => setShowAddressModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Address List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 custom-scroll">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                    tempSelectedAddress?.id === addr.id ? "border-red-500" : "border-gray-200 bg-white"
                  } hover:shadow-md`}
                  onClick={() => selectAddress(addr)}
                >
                  <div className="flex justify-between items-start gap-4">
                    {/* Left column */}
                    {editingAddressId === addr.id ? (
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Tên người nhận"
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          placeholder="Số điện thoại"
                        />
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          placeholder="Địa chỉ"
                        />
                        <div className="flex gap-3 pt-1">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            onClick={() => {
                              setAddresses((prev) =>
                                prev.map((a) => (a.id === addr.id ? { ...a, ...editForm } : a))
                              );
                              setEditingAddressId(null);
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                            onClick={() => setEditingAddressId(null)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="text-xl font-semibold mb-2 text-gray-800">{addr.name}</div>
                        <div className="text-sm text-gray-600 mb-2">{addr.phone}</div>
                        <p className="text-sm text-gray-700">{addr.address}</p>
                      </div>
                    )}

                    {/* Right column */}
                    <div className="flex flex-col items-end text-sm">
                      {addr.isDefault ? (
                        <span className="text-red-500 border border-red-500 px-3 py-2 rounded mb-4 text-xs font-medium">
                          Mặc Định
                        </span>
                      ) : (
                        <button
                          className="text-blue-600 border border-blue-500 px-3 py-2 rounded hover:bg-blue-50 mb-4 text-xs"
                          onClick={(e) => setAddressAsDefault(addr.id, e)}
                        >
                          Thiết lập mặc định
                        </button>
                      )}
                      <div className="flex gap-3">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => handleEditAddress(addr, e)}
                        >
                          Sửa
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => handleDeleteAddress(addr.id, e)}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add new address button */}
              <button
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition"
                onClick={openNewAddressModal}
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Địa Chỉ Mới
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                className="bg-gray-100 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
                onClick={() => setShowAddressModal(false)}
              >
                Hủy
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={confirmAddressSelection}
              >
                Xác Nhận
              </button>
            </div>
          </div>
        </div>
      )}


      {/* New Address Modal */}
      {showNewAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Modal content */}
          <div className="relative bg-white border border-gray-300 p-6 rounded-xl shadow-xl w-full max-w-3xl mx-4 animate-fadeIn z-10">
            <h2 className="text-xl font-bold mb-4">Địa chỉ mới</h2>

            <div className="space-y-4">
              {/* Name and Phone inputs in a grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Name input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={newAddressForm.name}
                    onChange={handleNewAddressChange}
                    placeholder="Họ và tên"
                    className="w-full border border-gray-300 rounded px-4 py-3"
                  />
                </div>

                {/* Phone input */}
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={newAddressForm.phone}
                    onChange={handleNewAddressChange}
                    placeholder="Số điện thoại"
                    className="w-full border border-gray-300 rounded px-4 py-3"
                  />
                </div>
              </div>

              {/* Location dropdown */}
              <div>
                <div className="relative">
                  <select
                    name="location"
                    value={newAddressForm.location}
                    onChange={handleNewAddressChange}
                    className="w-full border border-gray-300 rounded px-4 py-3 appearance-none"
                  >
                    <option value="">Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronRight className="h-4 w-4 transform rotate-90" />
                  </div>
                </div>
              </div>

              {/* Detailed address */}
              <div>
                <textarea
                  name="detailAddress"
                  value={newAddressForm.detailAddress}
                  onChange={handleNewAddressChange}
                  placeholder="Địa chỉ cụ thể"
                  className="w-full border border-gray-300 rounded px-4 py-3 h-40"
                ></textarea>
              </div>

              {/* Address type */}
              <div>
                <p className="mb-2">Loại địa chỉ:</p>
                <div className="flex space-x-4">
                  <button
                    className={`border rounded px-4 py-2 ${
                      newAddressForm.addressType === "home" ? "border-red-500 text-red-500" : "border-gray-300"
                    }`}
                    onClick={() => setNewAddressForm({ ...newAddressForm, addressType: "home" })}
                  >
                    Nhà Riêng
                  </button>
                  <button
                    className={`border rounded px-4 py-2 ${
                      newAddressForm.addressType === "office" ? "border-red-500 text-red-500" : "border-gray-300"
                    }`}
                    onClick={() => setNewAddressForm({ ...newAddressForm, addressType: "office" })}
                  >
                    Văn Phòng
                  </button>
                </div>
              </div>

              {/* Default address checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddressForm.isDefault}
                  onChange={handleNewAddressChange}
                  className="mr-2"
                />
                <label>Đặt làm địa chỉ mặc định</label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2" onClick={closeNewAddressModal}>
                Trở Lại
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleAddNewAddress}>
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}