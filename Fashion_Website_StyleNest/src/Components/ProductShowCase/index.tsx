import { Link } from "react-router-dom";
import ProductItem from "../ProductItem";
import Banner from "../Banner";
import FromTheBlog from "../FromTheBlog";

const products = [
  {
    id: 1,
    name: "Áo PoLo Nam Dáng Rộng",
    price: "$250.00",
    image: "/imgs/aopolonamslimfit2.jpg",
    alt: "Áo PoLo Nam Dáng Rộng",
    link: "#",
  },
  {
    id: 2,
    name: "Áo Thun Jogger Nam",
    price: "$190.00",
    image: "/imgs/aothunjoggernam2.jpg",
    alt: "Áo Thun Jogger Nam",
    link: "#",
  },
  {
    id: 3,
    name: "Áo Thun Nam Oxford",
    price: "$129.00",
    image: "/imgs/aothunnamoxford3.jpg",
    alt: "Áo Thun Nam Oxford",
    link: "#",
  },
];

export default function ProductShowcase() {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Free Shipping Banner */}
      <div className="border border-red-200 rounded-xl mb-12 bg-red-50 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex items-center gap-4 text-red-600">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h1a1 1 0 0 0 1-1v-5.1a1 1 0 0 0-.15-.5L19.15 8zM8 18a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm8 0a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2-3h-.78a3 3 0 0 0-4.44 0H9.22a3 3 0 0 0-4.44 0H5v-8h8v1a1 1 0 0 0 1 1h2.62l1.71 2.56-1.33 2v1.44z" />
            </svg>
            <h2 className="text-2xl font-bold">MIỄN PHÍ GIAO HÀNG</h2>
          </div>
          <p className="text-base text-center my-4 md:my-0 text-gray-700">
            Nhận giao hàng miễn phí cho đơn hàng đầu tiên hoặc đơn trên $200
          </p>
          <span className="text-xl font-semibold text-red-600">- Chỉ $200*</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
  {products.map((product) => (
    <article
      key={product.id}
      className="relative rounded-xl overflow-hidden group h-96"
    >
      {/* Background Image với overlay tối hơn */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 group-hover:from-black/70 group-hover:via-black/40 transition-all duration-500">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content floating trên ảnh */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top Content */}
        <div className="space-y-3">
          {product.isNew && (
            <span className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              MỚI
            </span>
          )}
        <h3 className="text-2xl font-bold text-white bg-black/60 px-3 py-2 rounded-lg text-center">
            {product.name}
          </h3>
        </div>

        {/* Bottom Content với nền semi-transparent */}
        <div className="bg-gray-900/80 hover:bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-white">{product.price}</p>
              {product.originalPrice && (
                <p className="text-sm text-gray-300 line-through">
                  {product.originalPrice}
                </p>
              )}
            </div>
            <Link to={product.link}>
              <button className="bg-amber-500 text-white hover:bg-amber-600 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 shadow-lg">
                <span>MUA NGAY</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hiệu ứng viền sáng */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 transition-all duration-500 rounded-xl pointer-events-none"></div>
    </article>
  ))}
</div>
      <ProductItem />
      <Banner />
      <FromTheBlog />
    </section>
  );
}
