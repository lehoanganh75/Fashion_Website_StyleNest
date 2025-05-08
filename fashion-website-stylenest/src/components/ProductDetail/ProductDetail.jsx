import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaHeart,
  FaExchangeAlt,
} from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import ProductDataSheet from "../ProductDataSheet/ProductDataSheet";
import { useParams } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
const ProductDetail = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("grey");
  const [activeImage, setActiveImage] = useState(0);
  const { products } = useData();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { loggedInAccount } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(value || 0);
    return `${formatted} VNĐ`;
  };

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  const incrementQuantity = () => setQuantity(quantity + 1);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (loggedInAccount) {
      addToCart({ ...product, quantity });
    } else {
      setShowLoginModal(true);
    }
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={`text-${i < rating ? "yellow-400" : "gray-300"}`}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="container mx-auto px-10 py-6 cursor-pointer font-['Roboto']">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Thumbnails */}
        <div className="w-full md:w-20 flex flex-row md:flex-col gap-4 order-2 md:order-1">
          {product.thumbnails.map((thumb, index) => (
            <div
              key={index}
              className={`relative border p-2 cursor-pointer transition-transform bg-white transform duration-200 ease-in-out rounded-lg ${
                activeImage === index
                  ? "border-gray-500 scale-105"
                  : "border-gray-200 hover:scale-105 hover:shadow-lg"
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img
                src={thumb || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-auto     rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Center Column - Main Image */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
            <img
              src={
                product.thumbnails[activeImage] ||
                "/placeholder.svg?height=500&width=500"
              }
              alt="Apple AirPods Max"
              className="w-full h-auto object-cover rounded-lg"
              style={{ aspectRatio: "1 / 1" }} // Hoặc bạn có thể điều chỉnh tỉ lệ theo nhu cầu
            />
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="w-full md:w-1/2 order-3 px-6 py-4 border border-gray-200 bg-white shadow-md rounded-lg">
          <div className="flex items-center mb-2">
            {renderStars(product.rating || 0)}
            <span className="ml-2 text-sm text-gray-600">
              {product.review} Review(s)
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {product.slogan ||
              "Thời trang không chỉ để mặc – đó là cách bạn kể câu chuyện của mình bằng từng đường nét, từng chất liệu, và từng nhịp bước đầy khí chất."}
          </p>

          <div className="space-y-4 border-t border-b border-gray-200 py-4">
            <div className="flex items-center">
              <span className="w-40 font-semibold text-gray-700">
                Thương hiệu:
              </span>
              <span className="text-gray-600">{product.brand}</span>
            </div>

            <div className="flex items-center">
              <span className="w-40 font-semibold text-gray-700">
                Tình trạng:
              </span>
              <span className="text-gray-600">
                {product.condition ? "New" : ""}
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-40 font-semibold text-gray-700">
                Có sẵn trong kho:
              </span>
              <span className="text-green-500">{product.instock} sản phẩm</span>
            </div>

            <div>
              <p className="text-gray-700">
                Nhanh lên! chỉ{" "}
                <span className="text-red-500">{product.instock}</span> sản phẩm
                còn hàng trong kho!
              </p>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
              </div>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer />

            {/* Color Selection */}
            <div>
              <div className="flex items-center mb-2">
                <span className="w-20 text-[18px] font-semibold text-gray-700">
                  Màu sắc:
                </span>
                <span className="text-gray-600 text-[18px]">
                  {selectedColor}
                </span>
              </div>
              <div className="flex space-x-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-gray-500 line-through text-lg">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-2xl font-bold text-red-500 ml-2">
                  {formatCurrency(product.price * (1 - product.discount / 100))}
                </span>
                <span className="ml-2 bg-red-100 text-red-500 px-2 py-1 text-xs rounded">
                  {product.discount} %
                </span>
              </div>

              <p className="text-sm text-gray-500">
                Miễn phí vận chuyển (thời gian từ 2 - 3 ngày)
              </p>

              {/* Quantity and Add to Cart */}
              <div className="flex space-x-4">
                <div className="flex border border-gray-300 rounded">
                  <button
                    className="px-3 py-2 border-r border-gray-300"
                    onClick={decrementQuantity}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center"
                  />
                  <button
                    className="px-3 py-2 border-l border-gray-300"
                    onClick={incrementQuantity}
                  >
                    <FiPlus />
                  </button>
                </div>

                <button
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* In Stock Badge */}
              <Link to="/cart">
                <div className="text-green-500 border border-green-500 px-3 py-2 text-sm rounded w-35 text-center">
                  Trong cửa hàng
                </div>
              </Link>

              {/* Social Share */}
              <div className="flex space-x-2 mt-4">
                <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center">
                  <FaFacebookF />
                </button>
                <button className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center">
                  <FaTwitter />
                </button>
                <button className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center">
                  <FaPinterestP />
                </button>
              </div>

              {/* Security and Delivery Policy */}
              <div className="space-y-4 mt-6">
                <div className="border border-gray-200 bg-gray-50 p-4 rounded flex">
                  <div className="mr-4 text-orange-400 text-2xl">🔒</div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Chính sách bảo mật
                    </h3>
                    <p className="text-sm text-gray-600">
                      (chỉnh sửa bằng mô-đun Đảm bảo cho khách hàng)
                    </p>
                  </div>
                </div>

                <div className="border border-gray-200 bg-gray-50 p-4 rounded flex">
                  <div className="mr-4 text-orange-400 text-2xl">🚚</div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Chính sách giao hàng
                    </h3>
                    <p className="text-sm text-gray-600">
                      (chỉnh sửa bằng mô-đun Đảm bảo cho khách hàng)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer text-[16px] ${
                activeTab === "description"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Miêu tả sản phẩm
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer text-[16px] ${
                activeTab === "details"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Chi tiết sản phẩm
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none border border-gray-200 px-10 py-6 rounded bg-white font-['Roboto']">
              {product.descriptions.map((desc, index) => {
                return (
                  <div key={index}>
                    <p className="font-semibold text-base text-gray-900 mb-2">
                      {desc.title || "Mô tả sản phẩm"}
                    </p>
                    <p className="text-base leading-[1.5] text-justify mb-2">
                      {desc.content || "Không có mô tả cho sản phẩm này."}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "details" && (
            <div>
              {/* Data Sheet Section */}
              <ProductDataSheet product={product} />
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <ProductCarousel products={products} />

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Đánh giá</h2>

        <div className="border border-gray-200 rounded p-6 bg-white">
          <div className="flex items-start">
            <div className="w-32">
              <div className="font-semibold">Grade</div>
              <div className="text-yellow-400 text-lg">★★★★★</div>
              <div className="mt-4 font-semibold">Marco</div>
              <div className="text-sm text-gray-500">03/05/2023</div>
            </div>

            <div className="flex-1">
              <div className="font-semibold mb-2">Perfect product!</div>
              <p className="text-gray-600">
                Có nhiều phiên bản khác nhau của các đoạn văn Lorem Ipsum, nhưng
                phần lớn đã bị thay đổi ở một số dạng, bằng cách thêm yếu tố hài
                hước hoặc các từ ngẫu nhiên trông không có vẻ đáng tin chút nào.
                Nếu bạn định sử dụng một đoạn văn bản Lorem Ipsum, bạn cần đảm
                bảo rằng không có điều gì đáng xấu hổ ẩn trong nội dung của nó.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                ✓ 2 trong số 2 người thấy đánh giá này hữu ích.
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <Modal handleShowModal={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default ProductDetail;
