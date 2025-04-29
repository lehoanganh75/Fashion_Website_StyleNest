import { useState } from 'react';
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductPage from './Pages/ProductPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import LoginFormPage from './Pages/LoginFormPage';
import AdminPage from './Pages/AdminPage';
import ShoppingCartPage from './Pages/ShoppingCartPage';
import Footer from './Components/Footer';
import Blogs from './Pages/BlogPage';
import BlogDetail from './Pages/BlogPageDetail'; 
import CartPage from './Pages/PageCart'

function App() {
  return (
    <BrowserRouter>
       <Header />
       <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail/>} />
        <Route path="/cart" element={<CartPage />} />
          {/* <Route path = {"/"} element={<Home />} /> */}
          {/* <Route path = {"/"} element={<ProductPage />} /> */}
          {/* <Route path = {"/"} element={<ProductDetailPage />} /> */}
          {/* <Route path = {"/"} element={<LoginFormPage />} /> */}
          {/* <Route path = {"/"} element={<AdminPage />} /> */}
          <Route path = {"/"} element={<ShoppingCartPage />} />
       </Routes>
       <Footer />
    </BrowserRouter>
  )
}

export default App;
