import React from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div className="searchBox w-full h-[50px] bg-[#e5e5e5] rounded-[5px] relative">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full h-full pl-3 focus:outline-none bg-inherit text-[15px] rounded-lg"
      />

      <Button className="!absolute top-[8px] right-[5px] z-50 !w-[35px] !min-w-[37px] h-[37px] !rounded-full text-black">
        <IoSearch className="text-[#2a2a2a] text-[22px]" />
      </Button>
    </div>
  );
};

export default Search;
