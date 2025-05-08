import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Phone, Calendar, Upload, Check, ChevronLeft, ChevronRight, X, ImageIcon, AlertCircle, ArrowRight, Loader2, TrendingUp, FileImage } from 'lucide-react'
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext"

export default function CustomerRegistrationForm() {
  const [formData, setFormData] = useState({
    id: "",
    customerName: "",
    gender: "",
    date: "",
    phone: "",
    img: null,
  })
  const [errors, setErrors] = useState({})
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { customers, saveCustomer } = useData();
  const { loggedInAccount } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        photo: "Kích thước tệp phải nhỏ hơn 5MB",
      })
      return
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      setErrors({
        ...errors,
        photo: "Chỉ hỗ trợ định dạng .jpg, .jpeg, .png và .webp",
      })
      return
    }

    setFormData({
      ...formData,
      photo: file,
    })

    setImageFiles([file]);

    // Create a preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Clear error
    if (errors.photo) {
      setErrors({
        ...errors,
        photo: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customerName || formData.customerName.length < 2) {
      newErrors.customerName = "Tên phải có ít nhất 2 ký tự"
    }

    if (!formData.date) {
      newErrors.date = "Ngày sinh là bắt buộc"
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính"
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Số điện thoại phải có ít nhất 10 chữ số"
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại chỉ được chứa chữ số"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true);
      const newCustomer = {
        id: String(Math.max(...customers.map((a) => Number(a.id) || 0), 0) + 1), // Chuyển id thành số nếu chưa có id
        customerName: formData.customerName,
        gender: formData.gender,
        date: formData.date,
        phone: formData.phone,
        email: loggedInAccount?.email || "none",
        img: formData.img,
      };
      console.log("Form data:", newCustomer)

      try {
        await saveCustomer(newCustomer, imageFiles); // Đợi lưu xong
        setTimeout(() => {
          setIsSubmitting(false);
          setFormSubmitted(true);
        }, 1500);
      } catch (error) {
        console.error("Lỗi khi lưu khách hàng:", error);
        setIsSubmitting(false);
      }
    }
  }

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  // Generate days for the current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateString = date.toISOString().split("T")[0]
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <button
          key={i}
          type="button"
          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
            formData.date === dateString
              ? "bg-gray-700 text-white shadow-md"
              : isToday
              ? "bg-gray-200 text-gray-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => {
            setFormData({
              ...formData,
              date: dateString,
            })
            setShowCalendar(false)
            if (errors.date) {
              setErrors({
                ...errors,
                date: "",
              })
            }
          }}
        >
          {i}
        </button>,
      )
    }

    return days
  }

  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ]

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    // Format date as DD/MM/YYYY (Vietnamese format)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const calendar = document.getElementById("calendar-popup")
      if (calendar && !calendar.contains(event.target) && !event.target.id.includes("date")) {
        setShowCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="p-4">
      <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mt-20 -mr-20 transform rotate-45"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full -mb-10 -ml-10"></div>
          <h2 className="text-2xl font-bold relative z-10">Thông Tin Khách Hàng</h2>
          <p className="text-gray-300 relative z-10">Vui lòng điền đầy đủ các trường bắt buộc</p>
        </div>

        {formSubmitted ? (
          <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-gray-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Đăng Ký Thành Công!</h3>
            <p className="text-gray-600 text-center mb-6">
              Cảm ơn bạn đã đăng ký. Thông tin của bạn đã được gửi thành công.
            </p>
            {/* Link to payment page */}
            <Link 
              to="/checkout" 
              className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center"
            >
              Quay lại thanh toán
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        ) : (
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className={`pl-10 block w-full rounded-lg border ${
                        errors.name ? "border-red-300 ring-red-100" : "border-gray-300 group-hover:border-gray-400"
                      } shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-all duration-200`}
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số Điện Thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`pl-10 block w-full rounded-lg border ${
                        errors.phone ? "border-red-300 ring-red-100" : "border-gray-300 group-hover:border-gray-400"
                      } shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-all duration-200`}
                      placeholder="Nhập số điện thoại của bạn"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Date of Birth Field */}
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Ngày Sinh <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formatDate(formData.date)}
                      readOnly
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`pl-10 block w-full rounded-lg border ${
                        errors.date ? "border-red-300 ring-red-100" : "border-gray-300 group-hover:border-gray-400"
                      } shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 transition-all duration-200 cursor-pointer`}
                      placeholder="Chọn ngày sinh"
                    />
                    {showCalendar && (
                      <div
                        id="calendar-popup"
                        className="absolute z-10 mt-2 bg-white rounded-lg shadow-xl p-4 border border-gray-100 w-72 animate-fadeIn"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <button
                            type="button"
                            onClick={() => changeMonth(-1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                          </button>
                          <h3 className="text-sm font-medium text-gray-700">{`${
                            months[currentDate.getMonth()]
                          } ${currentDate.getFullYear()}`}</h3>
                          <button
                            type="button"
                            onClick={() => changeMonth(1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                            <div key={day} className="text-xs font-medium text-gray-500 h-6 flex items-center justify-center">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {generateCalendarDays()}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setShowCalendar(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            Hủy
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const today = new Date().toISOString().split("T")[0]
                              setFormData({
                                ...formData,
                                date: today,
                              })
                              setShowCalendar(false)
                              if (errors.date) {
                                setErrors({
                                  ...errors,
                                  date: "",
                                })
                              }
                            }}
                            className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          >
                            Hôm nay
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Giới Tính <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-row space-x-4">
                    <label
                      htmlFor="gender-male"
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.gender === "male"
                          ? "bg-gray-100 border-gray-300 ring-2 ring-gray-200"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        id="gender-male"
                        name="gender"
                        type="radio"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Nam</span>
                    </label>
                    <label
                      htmlFor="gender-female"
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.gender === "female"
                          ? "bg-gray-100 border-gray-300 ring-2 ring-gray-200"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        id="gender-female"
                        name="gender"
                        type="radio"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Nữ</span>
                    </label>
                    <label
                      htmlFor="gender-other"
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.gender === "other"
                          ? "bg-gray-100 border-gray-300 ring-2 ring-gray-200"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        id="gender-other"
                        name="gender"
                        type="radio"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Khác</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Photo Upload Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="relative group">
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => document.getElementById("photo-upload")?.click()}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                        >
                          <Upload className="h-5 w-5 mr-2 text-gray-400" />
                          Chọn Hình Ảnh
                        </button>
                        <span className="ml-3 text-sm text-gray-500">
                          {formData.photo ? formData.photo.name : "Chưa chọn tệp nào"}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-gray-500" />
                        Kích thước tối đa: 5MB
                      </p>
                      <p className="flex items-center">
                        <FileImage className="h-4 w-4 mr-1 text-gray-500" />
                        Định dạng: JPG, PNG, WebP
                      </p>
                    </div>
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.photo}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {photoPreview ? (
                      <div className="relative h-56 w-56 overflow-hidden rounded-lg border-2 border-gray-200 shadow-md group">
                        <img
                          src={photoPreview || "/placeholder.svg"}
                          alt="Preview"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoPreview(null)
                            setFormData({
                              ...formData,
                              photo: null,
                            })
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => document.getElementById("photo-upload")?.click()}>
                        <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Nhấp để tải ảnh lên</span>
                        <span className="text-xs text-gray-400 mt-1">hoặc kéo và thả</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-4 px-4 text-lg font-medium text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex justify-center items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-3" />
                      Đang Xử Lý...
                    </>
                  ) : (
                    <>
                      Đăng Ký
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
