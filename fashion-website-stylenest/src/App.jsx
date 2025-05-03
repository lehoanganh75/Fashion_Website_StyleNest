import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages (User)
import HomePage from './pages/HomePage';
import OrderTracking from "./components/FollowOrder/orderTracking";
import OrderTrackingDetail from "./components/FollowOrder/orderTrackingDetail";
import Support from "./components/Support";
import NotificationsPage from "./components/FollowOrder/OrderThongBao";
import Profile from "./components/FollowOrder/Profile";
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Blogs from './pages/BlogPage';
import BlogPost from './components/FromTheBlog/BlogPost';
import BrandPage from "./pages/BrandPage";
import ShoppingCartPage from './pages/ShoppingCartPage';

// Pages (Admin)
import Dashboard from './components/Dashboard/Dashboard';
import ReportChart from './components/ReportChart/ReportChart';
import ProductTable from './components/ProductGird/ProductTable';
import Account from './components/Account/Account';
import ProfileAdmin from './components/Profile/Profile';
import Customer from './components/Customer/Customer';
import Order from './components/Order/Order';

function App() {
  return (
    <Routes>
      {/* USER LAYOUT */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="order-tracking" element={<OrderTracking />} />
        <Route path="order-tracking/:orderId" element={<OrderTrackingDetail />} />
        <Route path="support" element={<Support />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="product/:category" element={<ProductPage />} />
        <Route path="product/:category/:id" element={<ProductDetailPage />} />
        <Route path="blog" element={<Blogs />} />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="brands" element={<BrandPage />} />
        <Route path="cart" element={<ShoppingCartPage />} />
      </Route>

      {/* ADMIN LAYOUT */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="chart" element={<ReportChart />} />
        <Route path="profile" element={<ProfileAdmin />} />
        <Route path="product" element={<ProductTable />} />
        <Route path="account" element={<Account />} />
        <Route path="customer" element={<Customer />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
