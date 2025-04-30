import React, { useState, useEffect } from "react";
import ProductCard from "../ProductItem/ProductCard"; // Đảm bảo đường dẫn đúng
import "boxicons/css/boxicons.min.css";

const ProductCarousel = ({ products, itemsPerPage = 5 }) => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const currentProducts = products.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Tự động chuyển trang mỗi 3 giây
    useEffect(() => {
        const autoSlide = setInterval(() => {
            setCurrentPage(prev =>
                prev < totalPages - 1 ? prev + 1 : 0
            );
        }, 3000);
        return () => clearInterval(autoSlide);
    }, [totalPages]);

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Có thể bạn cũng thích
                </h2>
                <div className="flex space-x-2">
                    <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow ${
                            currentPage > 0
                                ? "bg-white hover:bg-gray-100 text-gray-800"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={prevPage}
                        disabled={currentPage === 0}
                    >
                        <i class='bx bx-left-arrow-alt' ></i>
                    </button>
                    <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow ${
                            currentPage < totalPages - 1
                                ? "bg-white hover:bg-gray-100 text-gray-800"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        <i class='bx bx-right-arrow-alt' ></i>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 transition-all duration-500">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
