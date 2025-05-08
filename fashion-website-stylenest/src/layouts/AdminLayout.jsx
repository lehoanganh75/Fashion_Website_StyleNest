import React from 'react';
import HeaderAdmin from '../components/Header/HeaderAdmin';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { loggedInAccount } = useAuth();
  const { users } = useData(); 

  console.log("Logged in account:", loggedInAccount);

  const foundUser = () => {
    if (!users || users.length === 0) {
      console.log("No users data available");
      return undefined;
    }
    return users.find((user) => user.account.email === loggedInAccount?.email);
  };  

  console.log("Logged in account:", foundUser());
  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar fixed */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-20">
        <Sidebar />
      </div>

      {/* Main content with margin-left for Sidebar */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header fixed */}
        <div className="fixed top-0 left-64 right-0 z-10">
          <HeaderAdmin user={foundUser()}/>
        </div>

        {/* Scrollable content */}
        <div className="mt-[70px] overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
