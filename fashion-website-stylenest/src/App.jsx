import Header from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import BrandPage from "./pages/BrandPage";
import Footer from './components/Footer/Footer';
import Blogs from './pages/BlogPage';
import BlogPost from './components/FromTheBlog/BlogPost';
import AdminPage from './pages/AdminPage'; 
import { CartProvider } from './contexts/CartContext';
import OrderTracking from "./components/FollowOrder/orderTracking";
import OrderTrackingDetail from "./components/FollowOrder/orderTrackingDetail";
import NotificationsPage from "./components/FollowOrder/OrderThongBao"
import Profile from "./components/FollowOrder/Profile"
import Support from "./components/Support"
function App() {
  return (
    <CartProvider>
      <Routes>
        {/* <Route path="*" element={<AdminPage />} /> */}
      </Routes>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order-tracking" element={<OrderTracking />}/>
            <Route path="/order-tracking/:orderId" element={<OrderTrackingDetail />} />
            <Route path="/support" element={<Support />}/>
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/brands" element={<BrandPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
