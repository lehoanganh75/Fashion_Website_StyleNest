import React, { useState, useEffect } from 'react';

const ProfileCard = ({ users }) => {
  const [user, setUser] = useState(null);
  const [editPersonal, setEditPersonal] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [editAccount, setEditAccount] = useState(false);

  const id = "1";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const foundUser = users.find(e => e.id === id);
    setUser(foundUser);
  }, [users]);

  const handleChange = (field, value, nested = null) => {
    setUser(prev => ({
      ...prev,
      ...(nested
        ? { [nested]: { ...prev[nested], [field]: value } }
        : { [field]: value }),
    }));
  };

  if (!user) return <p className="text-center mt-10 text-gray-500">Đang tải thông tin người dùng...</p>;

  const inputStyle = "border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-400 w-full";

  return (
    <div className="p-4 space-y-4">
      {/* Thông tin cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">🧑 Thông tin cá nhân</h1>
        <button
          className="absolute top-6 right-6 text-gray-600 text-sm"
          onClick={() => setEditPersonal(!editPersonal)}
        >
          {editPersonal ? '💾 Lưu' : '✏️ Chỉnh sửa'}
        </button>
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
              {editPersonal ? (
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
              {editPersonal ? (
                <input
                  type="text"
                  value={user.account.role}
                  onChange={(e) => handleChange("role", e.target.value, "account")}
                  className={inputStyle}
                />
              ) : (
                <strong>{user.account.role}</strong>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết cá nhân */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Chi tiết cá nhân</h2>
        <button
          className="absolute top-6 right-6 text-gray-600 text-sm"
          onClick={() => setEditDetail(!editDetail)}
        >
          {editDetail ? '💾 Lưu' : '✏️ Chỉnh sửa'}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
          <div>
            <p className="mb-1 font-medium">Giới tính</p>
            {editDetail
              ? <input type="text" value={user.gender} onChange={(e) => handleChange("gender", e.target.value)} className={inputStyle} />
              : <strong>{user.gender}</strong>
            }
          </div>
          <div>
            <p className="mb-1 font-medium">Ngày sinh</p>
            {editDetail
              ? <input type="date" value={user.date} onChange={(e) => handleChange("date", e.target.value)} className={inputStyle} />
              : <strong>{formatDate(user.date)}</strong>
            }
          </div>
          <div>
            <p className="mb-1 font-medium">Số điện thoại</p>
            {editDetail
              ? <input type="text" value={user.phone} onChange={(e) => handleChange("phone", e.target.value)} className={inputStyle} />
              : <strong>{user.phone}</strong>
            }
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 relative">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">🔐 Thông tin tài khoản</h2>
        <button
          className="absolute top-6 right-6 text-gray-600 text-sm"
          onClick={() => setEditAccount(!editAccount)}
        >
          {editAccount ? '💾 Lưu' : '✏️ Chỉnh sửa'}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
          <div>
            <p className="mb-1 font-medium">Tài khoản</p>
            {editAccount
              ? <input type="text" value={user.account.userName} onChange={(e) => handleChange("userName", e.target.value, "account")} className={inputStyle} />
              : <strong>{user.account.userName}</strong>
            }
          </div>
          <div>
            <p className="mb-1 font-medium">Mật khẩu</p>
            {editAccount
              ? <input type="text" value={user.account.password} onChange={(e) => handleChange("password", e.target.value, "account")} className={inputStyle} />
              : <strong>{user.account.password}</strong>
            }
          </div>
          <div>
            <p className="mb-1 font-medium">Email</p>
            {editAccount
              ? <input type="email" value={user.account.email} onChange={(e) => handleChange("email", e.target.value, "account")} className={inputStyle} />
              : <strong>{user.account.email}</strong>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
