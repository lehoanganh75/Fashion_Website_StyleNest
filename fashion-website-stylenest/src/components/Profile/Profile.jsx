import React from 'react';
import ProfileCard from './ProfileCard';
import { useData } from '../../contexts/DataContext';

const Profile = () => {
  const { users, setUsers } = useData(); // Lấy cả users và setUsers từ context

  return (
    <div>
      {/* Truyền cả hai props vào ProfileCard */}
      {users && users.length > 0 ? (
        <ProfileCard users={users} setUsers={setUsers} />
      ) : (
        <p className="text-center mt-10 text-gray-500">Đang tải dữ liệu người dùng...</p>
      )}
    </div>
  );
};

export default Profile;