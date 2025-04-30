import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "../Navigation/Navigation";
import LoginForm from "../Login/LoginForm";
import RegisterForm from "../Login/RegisterForm";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [authFormView, setAuthFormView] = useState("login") // "login" or "register"

  // Function to track scroll event
  const handleScroll = () => {
    // Get header height
    const headerElement = document.querySelector("header")
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight

      if (window.scrollY > headerHeight) {
        setIsScrolled(true) // When scrolled past header, fix Navigation
      } else {
        setIsScrolled(false) // If not scrolled past header, unfix
      }
    }
  }

  const handleOpenLogin = () => {
    setAuthFormView("login")
    setIsLoginOpen(true)
  }

  const handleOpenRegister = () => {
    setAuthFormView("register")
    setIsLoginOpen(true)
  }

  const handleCloseAuthForm = () => {
    setIsLoginOpen(false)
  }

  // Use useEffect to add and remove scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // Clean up event when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []);

  return (
    <div>
      <header className="bg-white">
        {/* Top Strip */}
        <div className="py-2 border-t border-b border-gray-100">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-sm font-normal text-gray-600 pl-4">
              Giảm giá tới 50% cho các kiểu dáng mùa mới, chỉ trong thời gian có hạn
            </p>
            <ul className="flex space-x-3">
              <li>
                <Link
                    to="#"
                  className="text-sm font-medium text-gray-800 hover:text-orange-500"
                >
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  to="/order-tracking"
                  className="text-sm font-medium text-gray-800 hover:text-orange-500 pr-2"
                >
                  Theo dõi đơn hàng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 border-t border-b border-gray-200">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="w-1/4 flex justify-center">
              <Link to="/">
                <img src="/imgs/logo.png" className="w-32 h-auto" alt="Logo" />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="w-2/5">
              <Search />
            </div>

            {/* User Account and Cart */}
            <div className="w-1/4 flex items-center justify-end space-x-4">
              <ul className="flex items-center space-x-4 pr-2">
                <li className="text-sm font-medium text-gray-800">
                  <button
                    onClick={handleOpenLogin}
                    className="hover:text-orange-500"
                  >
                    Đăng nhập
                  </button>
                  <span className="p-2">|</span>
                  <button
                    onClick={handleOpenRegister}
                    className="hover:text-orange-500"
                  >
                    Đăng ký
                  </button>
                </li>
                <li>
                  <Tooltip title="Liên kết">
                    <IconButton aria-label="io">
                      <StyledBadge badgeContent={0} color="secondary">
                        <IoIosGitCompare className="text-xl text-gray-800 hover:text-orange-500" />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Yêu thích">
                    <IconButton aria-label="heart">
                      <StyledBadge badgeContent={0} color="secondary">
                        <FaRegHeart className="text-xl text-gray-800 hover:text-orange-500" />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Giỏ hàng">
                    <Link to="/cart" aria-label="cart">
                      <IconButton aria-label="cart">
                        <StyledBadge badgeContent={0} color="secondary">
                          <MdOutlineShoppingCart className="text-xl text-gray-800 hover:text-orange-500" />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation chỉ hiển thị ở vị trí cố định khi cuộn qua hết Header */}
        <div
          className={`${
            isScrolled ? "fixed top-0 left-0 w-full z-40 shadow bg-white" : ""
          }`}
        >
          <Navigation />
        </div>
      </header>

      {isLoginOpen && <LoginForm isOpen={isLoginOpen} onClose={handleCloseAuthForm} initialView={authFormView} />}
    </div>
  );
};

export default Header;
