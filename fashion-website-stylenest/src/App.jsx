import Header from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginFormPage from './pages/LoginFormPage';
import AdminPage from './pages/AdminPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import Footer from './components/Footer/Footer';
import Blogs from './pages/BlogPage';
import BlogDetail from './pages/BlogPageDetail';
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Login/RegisterForm";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/blog" element={<Blogs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
