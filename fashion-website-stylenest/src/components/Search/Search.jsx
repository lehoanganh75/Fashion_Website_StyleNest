import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import data from "../../data/data.json"; // Import dữ liệu sản phẩm

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { category } = useParams();
    const navigate = useNavigate();

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setIsDropdownOpen(true);

        if (value.trim() === "") {
            setSearchResults([]);
            setIsDropdownOpen(false);
            return;
        }

        // Lọc các sản phẩm có tên chứa chuỗi tìm kiếm (không phân biệt hoa thường)
        const results = data.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results.slice(0, 5)); // Hiển thị tối đa 5 kết quả
    };

    const handleSelectSearchResult = (productName) => {
        const safeCategory = category || "fashion";
        setSearchTerm(productName);
        setSearchResults([]);
        setIsDropdownOpen(false);
        navigate(`/product/${safeCategory}?name=${productName}`);
    };

    const handleSearchSubmit = () => {
        const safeCategory = category || "fashion";
        if (searchTerm.trim()) {
            navigate(`/product/${safeCategory}?name=${searchTerm}`);
        }
    };

    return (
        <div className="relative">
            <div className="w-full h-[50px] rounded-4xl flex items-center px-5 border-gray-200 border-1 shadow-sm">
                <input
                    type="text"
                    placeholder="Tìm sản phẩm..."
                    className="w-full h-full bg-transparent text-[15px] text-gray-800 placeholder:text-gray-500 focus:outline-none pr-12"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    onFocus={() => searchTerm.trim() && setSearchResults(data.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).slice(0, 5))}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && searchTerm.trim()) {
                            handleSearchSubmit();
                        }
                    }}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition duration-300"
                    onClick={handleSearchSubmit}
                >
                    <IoSearch className="text-[20px]" />
                </button>
            </div>
            {isDropdownOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-50">
                    <ul>
                        {searchResults.map(product => (
                            <li
                                key={product.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectSearchResult(product.name)}
                            >
                                {product.name}
                            </li>
                        ))}
                        {searchResults.length > 5 && (
                            <li className="px-4 py-2 text-center text-gray-500">
                                Xem thêm ({data.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length - 5} kết quả)
                            </li>
                        )}
                        {searchResults.length === 0 && searchTerm.trim() && (
                            <li className="px-4 py-2 text-center text-gray-500">
                                Không tìm thấy sản phẩm nào
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Search;