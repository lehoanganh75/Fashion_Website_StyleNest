import React from 'react';
import { IoSearch } from 'react-icons/io5';

const Search = () => {
  return (
    <div className="w-full h-[50px] rounded-4xl relative flex items-center px-5 border-gray-200 border-1 shadow-sm">
      <input
        type="text"
        placeholder="Tìm sản phẩm..."
        className="w-full h-full bg-transparent text-[15px] text-gray-800 placeholder:text-gray-500 focus:outline-none pr-12"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition duration-300"
      >
        <IoSearch className="text-[20px]" />
      </button>
    </div>
  );
};

export default Search;
