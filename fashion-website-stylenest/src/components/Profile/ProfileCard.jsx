import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";

const ProfileCard = ({ foundUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(foundUser);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.account) {
      setFormData((prevData) => ({
        ...prevData,
        account: {
          ...prevData.account,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const userUpdate = {
      id: formData.id,
      name: formData.name,
      gender: formData.gender,
      date: formData.date,
      phone: formData.phone,
    };

    console.log("Dữ liệu người dùng sau khi sửa:", userUpdate);

    updateUser(userUpdate);
    setIsEditing(false);
  };

  const inputStyle =
    "border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition";

  if (!formData)
    return (
      <p className="text-center mt-10 text-gray-500">Đang tải thông tin người dùng...</p>
    );

  return (
    <div className="space-y-4 font-['Roboto']">
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        {isEditing ? (
          <div className="space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition focus:ring-2 focus:ring-green-300"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-xl transition focus:ring-2 focus:ring-gray-300"
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl flex items-center gap-2 transition focus:ring-2 focus:ring-blue-400"
          >
            <i className='bx bx-edit-alt text-lg'></i>
            <span>Chỉnh sửa</span>
          </button>
        )}
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <i className='bx bx-user text-xl'></i>
          <span>Thông tin cá nhân</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={formData.img || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <div className="flex flex-col gap-4 w-full">
            <div>
              <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputStyle}
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{formData.name}</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Vai trò</p>
              <p className="text-lg font-semibold text-gray-800">{formData.account.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className='bx bx-clipboard text-lg'></i>
          <span>Chi tiết cá nhân</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Giới tính</p>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputStyle}
              />
            ) : (
              <p className="text-base text-gray-800 font-medium">{formData.gender}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Ngày sinh</p>
            {isEditing ? (
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputStyle}
              />
            ) : (
              <p className="text-base text-gray-800 font-medium">{formatDate(formData.date)}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputStyle}
              />
            ) : (
              <p className="text-base text-gray-800 font-medium">{formData.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <i className='bx bx-lock-alt text-lg'></i>
          <span>Thông tin tài khoản</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Tài khoản</p>
            <p className="text-base text-gray-800 font-medium">{formData.account.userName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Mật khẩu</p>
            <p className="text-base text-gray-800 font-medium">{formData.account.password}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-base text-gray-800 font-medium">{formData.account.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;