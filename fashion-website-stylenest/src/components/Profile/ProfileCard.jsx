// ProfileCard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../../contexts/DataContext"; // Thêm import useData

const ProfileCard = ({ users, setUsers }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateUser } = useData(); // Lấy hàm updateUser từ context

  const id = "1"; // ID của người dùng cần sửa

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Tìm user với ID từ props users
  useEffect(() => {
    if (users && users.length > 0) {
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        setUser(foundUser);
        console.log("Đã tìm thấy người dùng:", foundUser);
      } else {
        console.log("Không tìm thấy người dùng với ID:", id);
      }
    }
  }, [users]);

  // Hàm xử lý thay đổi input
  const handleChange = (fieldPath, value) => {
    const keys = fieldPath.split(".");
    setUser((prev) => {
      const updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested[keys[i]] = { ...nested[keys[i]] };
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  

  const handleSave = async () => {
    if (!user) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const updatedUser = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        date: user.date,
        phone: user.phone,
      };
  
      // Gọi hàm updateUser từ context hoặc API để cập nhật
      await updateUser(updatedUser);
  
      // Cập nhật lại danh sách users trong parent component (nếu cần)
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
  
      setIsEditing(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      setError("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const inputStyle =
    "border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full";

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">
        Đang tải thông tin người dùng...
      </p>
    );

  return (
    <div className="p-4 space-y-4">
      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Nút chỉnh sửa/lưu */}
      <div className="text-right mb-4">
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "💾 Lưu thay đổi"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            ✏️ Chỉnh sửa
          </button>
        )}
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          🧑 Thông tin cá nhân
        </h1>
        <div className="flex items-center gap-6">
          <img
            src={user.img || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <div className="flex flex-col gap-4 text-gray-700 text-base w-full">
            {/* Họ và tên */}
            <div>
              <p className="mb-1 font-medium">Họ và tên</p>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputStyle}
                />
              ) : (
                <strong>{user.name}</strong>
              )}
            </div>

            {/* Vai trò */}
            <div>
              <p className="mb-1 font-medium">Vai trò</p>

              <strong>{user.account.role}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          📋 Chi tiết cá nhân
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
          <div>
            <p className="mb-1 font-medium">Giới tính</p>
            {isEditing ? (
              <input
                type="text"
                value={user.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className={inputStyle}
              />
            ) : (
              <strong>{user.gender}</strong>
            )}
          </div>
          <div>
            <p className="mb-1 font-medium">Ngày sinh</p>
            {isEditing ? (
              <input
                type="date"
                value={user.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={inputStyle}
              />
            ) : (
              <strong>{formatDate(user.date)}</strong>
            )}
          </div>
          <div>
            <p className="mb-1 font-medium">Số điện thoại</p>
            {isEditing ? (
              <input
                type="text"
                value={user.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={inputStyle}
              />
            ) : (
              <strong>{user.phone}</strong>
            )}
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          🔐 Thông tin tài khoản
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
          <div>
            <p className="mb-1 font-medium">Tài khoản</p>

            <strong>{user.account.userName}</strong>
          </div>
          <div>
            <p className="mb-1 font-medium">Mật khẩu</p>

            <strong>{user.account.password}</strong>
          </div>
          <div>
            <p className="mb-1 font-medium">Email</p>

            <strong>{user.account.email}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
