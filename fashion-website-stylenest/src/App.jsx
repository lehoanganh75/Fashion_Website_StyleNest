import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages (User)
import HomePage from './pages/HomePage';
import OrderTracking from "./components/FollowOrder/orderTracking";
import Support from "./components/Support";
import NotificationsPage from "./components/FollowOrder/OrderThongBao";
import Profile from "./components/FollowOrder/Profile";
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Blogs from './pages/BlogPage';
import BlogPost from './components/FromTheBlog/BlogPost';
import BrandPage from "./pages/BrandPage";
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import CustomerRegistrationForm from './components/CustomerRegistrationForm/CustomerRegistrationForm';

// Pages (Admin)
import Dashboard from './components/Dashboard/Dashboard';
import ReportChart from './components/ReportChart/ReportChart';
import ProductTable from './components/ProductGird/ProductTable';
import Account from './components/Account/Account';
import ProfileAdmin from './components/Profile/Profile';
import Customer from './components/Customer/Customer';
import Order from './components/Order/Order';

import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <Routes>
          {/* USER LAYOUT */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="order-tracking" element={<OrderTracking />} />
            <Route path="support" element={<Support />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="product/:category" element={<ProductPage />} />
            <Route path="product/:category/:id" element={<ProductDetailPage />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="brands" element={<BrandPage />} />
            <Route path="cart" element={<ShoppingCartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="info" element={<CustomerRegistrationForm />} />
          </Route>

          {/* ADMIN LAYOUT */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chart" element={<ReportChart />} />
            <Route path="profile" element={<ProfileAdmin />} />
            <Route path="product" element={<ProductTable />} />
            <Route path="account" element={<Account />} />
            <Route path="customer" element={<Customer />} />
            <Route path="order" element={<Order />} />
          </Route>
        </Routes>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
