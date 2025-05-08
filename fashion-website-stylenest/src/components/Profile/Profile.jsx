import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import { useData } from '../../contexts/DataContext';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { users, setUsers, updateUser } = useData(); // Lấy cả users và setUsers từ context
  const [loading, setLoading] = useState(true);
  const { loggedInAccount } = useAuth();

  // Lấy lại dữ liệu từ API sau khi thực hiện thao tác
  const refreshUsers = async () => {
    try {
      setLoading(true); // Set trạng thái loading
      const response = await axios.get("http://localhost:5000/api/users"); // Đường dẫn API để lấy dữ liệu người dùng
      setUsers(response.data); // Cập nhật lại dữ liệu sản phẩm
    } catch (error) {
      console.error("Lỗi khi tải lại dữ liệu sản phẩm", error);
    } finally {
      setLoading(false); // Tắt loading khi lấy xong dữ liệu
    }
  };

  const foundUser = () => {
    if (!users || users.length === 0) {
      console.log("No users data available");
      return undefined;
    }
    return users.find((user) => user.account.email === loggedInAccount?.email);
  }; 

  // Dùng useEffect để cập nhật khi có thay đổi dữ liệu (nếu có)
  useEffect(() => {
    refreshUsers();
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  return (
    <div className="p-4 w-full">
      {loading ? (
        <p>Đang tải...</p> // Hiển thị trạng thái loading nếu đang lấy dữ liệu
      ) : (
        <ProfileCard foundUser={foundUser} updateUser={updateUser}/>
      )}
      {/* Chuyển props users và setUsers cho ProfileCard */}
    </div>
  );
};

export default Profile;