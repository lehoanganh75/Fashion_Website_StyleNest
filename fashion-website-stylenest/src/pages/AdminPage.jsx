import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import HeaderAdmin from '../components/Header/HeaderAdmin';
import ReportChart from '../components/ReportChart/ReportChart';
import Profile from '../components/Profile/Profile';
import ProductTable from '../components/ProductGird/ProductTable';
import Account from '../components/Account/Account';
import Customer from '../components/Customer/Customer';
import Order from '../components/Order/Order';
import Sidebar from '../components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';

const AdminPage = () => {
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
            <HeaderAdmin />
          </div>
  
          {/* Scrollable content */}
          <div className="mt-[70px] overflow-y-auto h-[calc(100vh-64px)]">
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chart" element={<ReportChart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product" element={<ProductTable />} />
              <Route path="account" element={<Account />} />
              <Route path="customer" element={<Customer />} />
              <Route path="order" element={<Order />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  };

export default AdminPage;
