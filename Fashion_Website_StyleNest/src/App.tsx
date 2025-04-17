import { useState } from 'react';
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';

function App() {

  return (
    <BrowserRouter>
       <Header />
       <Routes>
          <Route path = {"/"} element={<Home />} />
       </Routes>
       <Footer />
    </BrowserRouter>
  )
}

export default App
