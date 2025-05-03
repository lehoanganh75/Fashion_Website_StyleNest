import { useState } from "react";
import { Heart, Maximize, ShoppingCart, Share2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import ProductBadge from "../ProductBadge/ProductBadge";
import { useCart } from "../../contexts/CartContext"

const ProductCard = ({ product, listView = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { category }  = useParams();
  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(value || 0);
    return `${formatted} VNĐ`;
  };
  const productLink = `/product/${category}/${product.id}`;

  const handleMaximize = (e) => {
    e.preventDefault();
    navigate(productLink);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
  };

  // 👉 List View
  if (listView) {
    return (
      <div
        className="border border-gray-200 p-4 relative flex flex-row h-full transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {product.discount && <ProductBadge type="discount" value={product.discount} />}
          {isHovering && product.condition && <ProductBadge type="new" />}
        </div>

        {isHovering && (
          <div className="absolute right-2 top-2 flex gap-2 z-20">
            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-orange-600 group transition-colors"
              onClick={() => setFavoriteActive(!favoriteActive)}
            >
              <Heart
                size={18}
                className={`${favoriteActive ? "fill-orange-500 text-orange-500" : "text-gray-600 group-hover:text-white"} transition-colors`}
              />
            </button>

            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-orange-600 group transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="text-gray-600 group-hover:text-white" />
            </button>

            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-orange-600 group transition-colors"
              onClick={handleMaximize}
            >
              <Maximize size={18} className="text-gray-600 group-hover:text-white" />
            </button>

            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-orange-600 group transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 size={18} className="text-gray-600 group-hover:text-white" />
            </button>
          </div>
        )}

        <Link to={productLink} className="relative h-48 w-48 flex-shrink-0 flex items-center justify-center overflow-hidden group mr-4">
          <img
            src={product.thumbnails[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <div className="flex flex-col flex-grow">
          <div className="text-gray-500 text-sm mb-1">{product.brand || "Không rõ thương hiệu"}</div>
          <Link to={productLink}>
            <h3 className="font-medium text-gray-900 mb-2 hover:text-orange-600">{product.name}</h3>
          </Link>

          <div className="mb-2">
            <RatingStars rating={product.rating || 0} />
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2">
              {product.discount ? (
                <>
                  <span className="text-gray-400 line-through">{formatCurrency(product.price)}</span>
                  <span className="text-red-500 font-medium">{formatCurrency(product.price * (1 - product.discount / 100))}</span>
                </>
              ) : (
                <span className="font-medium">{formatCurrency(product.price)}</span>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-1.5">{product.slogan || "Không có mô tả cho sản phẩm này."}</p>

          <div className="flex gap-2">
          {product.instock > 0 ? (
              <div className="text-green-500 border border-green-500 px-3 py-2 text-sm rounded">Còn hàng</div>
            ) : (
              <div className="text-red-500 border border-red-500 px-3 py-2 text-sm rounded">Hết hàng</div>
            )}
            <Link
              to={productLink}
              className="bg-orange-500 text-white font-medium py-2 px-3 rounded transition-colors hover:bg-orange-600"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 👉 Grid View
  return (
    <Link
      to={productLink}
      className="relative bg-white border border-gray-200 p-3 rounded-sm shadow-md hover:shadow-2xl text-center flex flex-col items-center justify-between h-full transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        {product.discount && <ProductBadge type="discount" value={product.discount} />}
        {isHovering && product.condition && <ProductBadge type="new" />}
      </div>

      {isHovering && (
        <div className="absolute right-3 top-3 flex flex-col gap-2 z-20">
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-500 group transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setFavoriteActive(!favoriteActive);
            }}
          >
            <Heart
              size={18}
              className={`${favoriteActive ? "fill-red-500 text-red-500" : "text-gray-600 group-hover:text-white"} transition-colors`}
            />
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-500 group transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="text-gray-600 group-hover:text-white" />
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-500 group transition-colors"
            onClick={handleMaximize}
          >
            <Maximize size={18} className="text-gray-600 group-hover:text-white" />
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-500 group transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Share2 size={18} className="text-gray-600 group-hover:text-white" />
          </button>
        </div>
      )}

      <div className="relative mb-4 flex-1 flex items-center justify-center overflow-hidden group w-full">
        <img
          src={(product.thumbnails && product.thumbnails[0]) || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="w-full mt-auto">
        <p className="text-left text-sm text-gray-500 mb-1">
          {product.brand || "Không rõ thương hiệu"}
        </p>
        <h3 className="text-left font-semibold text-gray-800 text-base mb-2 leading-[1.5] h-min-12">
          {product.name}
        </h3>
        <RatingStars rating={product.rating || 0} />
        <div className="mt-2 flex items-center gap-2">
          {product.discount ? (
            <>
              <span className="text-gray-400 line-through text-sm">{formatCurrency(product.price)}</span>
              <span className="text-red-600 font-semibold">{formatCurrency(product.price * (1 - product.discount / 100))}</span>
            </>
          ) : (
            <span className="text-gray-900 font-semibold">{formatCurrency(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
