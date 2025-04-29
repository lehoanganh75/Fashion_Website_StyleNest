"use client";

import { useState, useEffect, useCallback, memo } from "react";
import productData from "../../data/data.json";
import { Heart } from "lucide-react"; // Import icon trái tim từ Lucide

interface Product {
  id: number;
  productName: string;
  price: number;
  image: string[];
  rating?: number;
  type: "áo" | "quần";
  SKU: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
  truncateText: (text: string, maxLength: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, isFavorite, toggleFavorite, truncateText }) => {
    return (
      <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[450px]">
        <div className="relative w-full h-48 mb-4">
          <img
            src={product.image[0]}
            alt={product.productName}
            className="object-contain w-full h-full rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {truncateText(product.productName, 20)}
        </h3>
        <p className="text-sm text-gray-600 mb-2">SKU: {product.SKU}</p>
        <div className="flex items-center mb-2">
          <p className="text-xl font-bold text-gray-900 mr-2">
            {product.price.toLocaleString("vi-VN")} VND
          </p>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < (product.rating || 0)
                  ? "text-orange-400 fill-orange-400"
                  : "text-gray-300"
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              strokeWidth="1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14.5 8.5L21 9.5L16 14L17 20L12 17L7 20L8 14L3 9.5L9.5 8.5L12 2Z"
                fill="currentColor"
              />
            </svg>
          ))}
        </div>
        <div className="flex justify-between mb-2 mt-auto">
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            onClick={() => alert(`Đã thêm ${product.productName} vào giỏ hàng!`)}
          >
            Mua
          </button>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isFavorite ? "bg-red-400 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => toggleFavorite(product.id)}
            aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-white stroke-white" : ""}`} />
          </button>
        </div>
      </div>
    );
  }
);

const ProductItem = () => {
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<"áo" | "quần" | "tất cả">("tất cả");
  const [displayCount, setDisplayCount] = useState<number>(8);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const normalizedData: Product[] = productData.map((item: any) => {
      const itemTypeLower = item.type.toLowerCase();
      const normalizedType =
        itemTypeLower === "quần tây"
          ? "quần"
          : itemTypeLower === "áo thun" || itemTypeLower === "áo"
          ? "áo"
          : item.type;
      return {
        ...item,
        type: normalizedType,
      };
    });
    setOriginalProducts(normalizedData);
    handleCategoryChange("tất cả", normalizedData); // Hiển thị tất cả sản phẩm ban đầu
  }, []);

  const shuffleArray = useCallback((array: Product[]): Product[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const handleCategoryChange = useCallback(
    (category: "áo" | "quần" | "tất cả", currentProducts: Product[]) => {
      setSelectedCategory(category);
      if (category === "tất cả") {
        // Nếu muốn giữ nguyên thứ tự từ data.json cho "tất cả", bạn có thể bỏ qua shuffle
        // setFilteredProducts([...currentProducts]);

        // Nếu vẫn muốn xen kẽ áo và quần (nhưng chỉ shuffle một lần ban đầu)
        const aoProducts = currentProducts.filter((product) => product.type === "áo");
        const quanProducts = currentProducts.filter((product) => product.type === "quần");
        const alternatedProducts: Product[] = [];
        const maxPairs = Math.min(aoProducts.length, quanProducts.length);
        for (let i = 0; i < maxPairs; i++) {
          if (i < aoProducts.length) alternatedProducts.push(aoProducts[i]);
          if (i < quanProducts.length) alternatedProducts.push(quanProducts[i]);
        }
        setFilteredProducts(alternatedProducts);
      } else {
        setFilteredProducts(currentProducts.filter((product) => product.type === category));
      }
      setDisplayCount(8);
    },
    [setSelectedCategory, setFilteredProducts, setDisplayCount]
  );

  const displayedProducts = filteredProducts.slice(0, displayCount);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }, []);

  const truncateText = useCallback(
    (text: string, maxLength: number) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    },
    []
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sản phẩm thời trang
        </h1>
        <div className="flex justify-center mb-6">
          <button
            className={`mx-2 px-4 py-2 rounded-md text-gray-700 font-semibold ${
              selectedCategory === "tất cả"
                ? "bg-orange-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("tất cả", originalProducts)}
          >
            Tất cả
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md text-gray-700 font-semibold ${
              selectedCategory === "áo"
                ? "bg-orange-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("áo", originalProducts)}
          >
            Áo
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-md text-gray-700 font-semibold ${
              selectedCategory === "quần"
                ? "bg-orange-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("quần", originalProducts)}
          >
            Quần
          </button>
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mb-6">
            Không có sản phẩm nào thuộc danh mục này.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              toggleFavorite={toggleFavorite}
              truncateText={truncateText}
            />
          ))}
        </div>
        {displayCount < filteredProducts.length && (
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setDisplayCount((prev) => prev + 8)}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;