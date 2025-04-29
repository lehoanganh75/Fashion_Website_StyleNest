import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import data from "../../data/data.json"; // <- import trực tiếp

interface Product {
  id: string;
  image: string[];
  productName: string;
  brand: string;
  price: number;
}

export default function NewProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data.slice(0, 3));
  }, []);

  return (
    <div className="border border-gray-200 p-6 rounded-lg mb-8 shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sản phẩm mới</h2>
      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="flex gap-4 items-center hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              <Link to={`/product/${product.id}`} className="block w-[80px] h-[80px] rounded-lg overflow-hidden">
                <img
                  src={product.image?.[0] || "/placeholder.svg"}
                  alt={product.productName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover rounded-lg transition-all duration-300 transform hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </Link>
            </div>
            <div className="flex-1">
              <Link
                to={`/product/${product.id}`}
                className="text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors line-clamp-2"
              >
                {product.productName}
              </Link>
              <div className="text-xs text-gray-500 mt-1">{product.brand}</div>
              <div className="mt-2">
                <span className="text-red-600 font-bold text-xl">
                  {product.price.toLocaleString("vi-VN")}₫
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/products"
        className="block text-center font-medium mt-6 text-red-500 hover:underline transition-colors"
      >
        Xem tất cả sản phẩm mới
      </Link>
    </div>
  );
}
