import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../../data/data.json";

const NewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.slice(0, 3));
  }, []);

  return (
    <div className="border border-gray-200 px-3 py-3 rounded-lg mb-8 shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sản phẩm mới</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-6 py-3 px-2 bg-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border-gray-800"
          >
            <div className="relative w-[80px] h-[80px]">
              <Link
                to={`/product/${product.id}`}
                className="block w-full h-full rounded-lg overflow-hidden"
              >
                <img
                  src={product.image?.[0] || "/placeholder.svg"}
                  alt={product.productName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg";
                  }}
                />
              </Link>
            </div>
            <div className="flex-1">
              <Link
                to={`/product/${product.id}`}
                className="text-base font-sm text-gray-800 hover:text-red-600 transition-colors block line-clamp-2"
              >
                {product.productName}
              </Link>
              <div className="text-base text-gray-500 mt-2">{product.brand}</div>
              <div className="mt-4">
                <span className="text-red-600 font-bold text-base">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/products"
        className="block text-center mt-4 font-medium text-red-500 hover:underline transition-colors"
      >
        Xem tất cả sản phẩm mới
      </Link>
    </div>
  );
};

export default NewProducts;
