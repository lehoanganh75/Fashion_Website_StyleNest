import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "../Navigation";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  return (
    <div>
      <header className="bg-white">
        <div className="top-strip py-2 border-t-[1px] border-gray-100 border-b-[1px]">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="col1 w-[50%]">
                <p className="text-[12px] font-[400]">
                  Giảm giá tới 50% cho các kiểu dáng mùa mới, chỉ trong thời
                  gian có hạn
                </p>
              </div>
              <div className="col2 flex items-center justify-end">
                <ul className="flex items-center gap-3">
                  <li className="list-none">
                    <Link
                      to="/help-center"
                      className="text-[13px] link font-[500] transaction"
                    >
                      Trung tâm trợ giúp
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="/order-tracking"
                      className="text-[13px] link font-[500] transaction"
                    >
                      Theo dõi đơn hàng
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header py-4 border-t-[1px] border-gray-200 border-b-[0.5px]">
          <div className="container flex items-center justify-between">
            <div className="col1 w-[25%] flex justify-center">
              <Link to="/" className="block">
                <img src="/imgs/logo.png" className="w-32 h-auto" alt="Logo" />
              </Link>
            </div>

            <div className="col2 w-[45%]">
              <Search />
            </div>

            <div className="col3 w-[30%] flex items-center pl-20">
              <ul className="flex items-center gap-3 w-full">
                <li className="list-none">
                  <Link
                    to="/login"
                    className="link transaction text-[15px] font-[500]"
                  >
                    Đăng nhập
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    className="link transaction text-[15px] font-[500]"
                  >
                    Đăng ký
                  </Link>
                </li>
                <li>
                  <Tooltip title="Liên kết">
                  <IconButton aria-label="io">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoIosGitCompare />
                    </StyledBadge>
                  </IconButton>
                  </Tooltip>
                </li>
                <li>
                 <Tooltip title="Yêu thích">
                 <IconButton aria-label="heart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                 </Tooltip>
                </li>
                <li>
                  <Tooltip title="Giỏ hàng">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <MdOutlineShoppingCart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Navigation />
      </header>
    </div>
  );
};

export default Header;
