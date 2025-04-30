import { useState } from "react"
import { FaFacebookF, FaTwitter, FaPinterestP, FaHeart, FaExchangeAlt } from "react-icons/fa"
import { FiMinus, FiPlus } from "react-icons/fi";
import ProductCard from "../ProductItem/ProductCard";
import CountdownTimer from "../CountdownTimer/CountdownTimer";
import ProductCarousel from "../ProductCarousel/ProductCarousel"
import ProductDataSheet from "../ProductDataSheet/ProductDataSheet";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState("description")
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState("grey")
    const [activeImage, setActiveImage] = useState(0)

    const thumbnails = [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
    ]

    const colors = [
        { name: "grey", class: "bg-gray-400" },
        { name: "green", class: "bg-green-400" },
        { name: "yellow", class: "bg-yellow-400" },
    ]

    const products = [
        {
          id: "1",
          name: "Apple AirPods Max Over-Ear Wireless Headphone",
          brand: "Gadget Zone",
          price: 47.0,
          discountedPrice: 42.0,
          discount: 5,
          isNew: true,
          rating: 5,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["grey", "green", "yellow"],
          size: "medium",
          availability: "inStock",
          condition: "new",
          dimension: "60x90cm",
          description:
            "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire that they cannot.",
        },
        {
          id: "2",
          name: "Apple Smart Watch / Midnight Aluminum",
          brand: "Initech space",
          price: 58.0,
          discountedPrice: 51.04,
          discount: 12,
          isNew: true,
          rating: 4,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["black", "blue", "yellow"],
          size: "small",
          availability: "inStock",
          condition: "new",
          dimension: "70x40cm",
        },
        {
          id: "3",
          name: "Eames Fiberglass Plastic Arm Chairs",
          brand: "Looney Tunes",
          price: 76.0,
          rating: 0,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["blue", "red"],
          size: "large",
          availability: "available",
          condition: "used",
          dimension: "60x90cm",
        },
        {
          id: "4",
          name: "BoAt Lite Smartwatch 1.69 Inches HD Display",
          brand: "Massive Dynamic",
          price: 69.0,
          discountedPrice: 64.17,
          discount: 7,
          rating: 5,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["black", "orange"],
          size: "medium",
          availability: "inStock",
          condition: "refurbished",
          dimension: "70x40cm",
        },
        {
          id: "5",
          name: "Cropped Satin Bomber Jacket",
          brand: "Pro Tech Gear",
          price: 94.0,
          rating: 0,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["pink", "red"],
          size: "large",
          availability: "notAvailable",
          condition: "used",
          dimension: "60x90cm",
        },
        {
          id: "6",
          name: "Organic Cotton T-Shirt",
          brand: "Soylent Green",
          price: 39.0,
          rating: 4,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["green", "blue", "grey"],
          size: "small",
          availability: "inStock",
          condition: "new",
        },
        {
          id: "7",
          name: "Vintage Denim Jacket",
          brand: "The Simpsons",
          price: 85.0,
          rating: 5,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["blue"],
          size: "xl",
          availability: "inStock",
          condition: "used",
        },
        {
          id: "8",
          name: "Leather Messenger Bag",
          brand: "Weeds Capital",
          price: 79.0,
          discountedPrice: 69.0,
          discount: 10,
          rating: 4,
          image: "/placeholder.svg?height=200&width=200",
          colors: ["black", "orange"],
          size: "large",
          availability: "inStock",
          condition: "new",
        },
    ]

    const productSpecifications = {
        logo: "/placeholder.svg?height=100&width=200",
        reference: "Product1",
        condition: "New",
        stock: 244,
        details: {
          Composition: "Cotton",
          Property: "Long sleeves",
          Style: "Classic",
        },
    }

    const [currentPage, setCurrentPage] = useState(0)
    const productsPerPage = 5
    const totalPages = Math.ceil(products.length / productsPerPage)

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1)
        }
      }
    
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

    const incrementQuantity = () => setQuantity(quantity + 1)

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
            <span key={i} className={`text-${i < rating ? "yellow-400" : "gray-300"}`}>
              ★
            </span>
        ))
    }

    return (
        <div className="container mx-auto px-4 py-8 cursor-pointer font-sans"> 
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Thumbnails */}
                <div className="w-full md:w-20 flex flex-row md:flex-col gap-4 order-2 md:order-1">
                    {thumbnails.map((thumb, index) => (
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
                            className="w-full h-auto rounded-lg"
                        />
                        </div>
                    ))}
                </div>

                {/* Center Column - Main Image */}
                <div className="w-full md:w-1/2 order-1 md:order-2 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                        <img
                        src={thumbnails[activeImage] || "/placeholder.svg?height=500&width=500"}
                        alt="Apple AirPods Max"
                        className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="w-full md:w-1/2 order-3 p-4 bg-white shadow-lg rounded-lg">
                    <div className="flex items-center mb-2">
                        {renderStars(5)}
                        <span className="ml-2 text-sm text-gray-600">1 Review(s)</span>
                    </div>

                    <h1 className="text-2xl font-bold mb-4 text-gray-900">Apple AirPods Max Over-Ear Wireless Headphone</h1>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                        We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire that they cannot foresee.
                    </p>

                    <div className="space-y-4 border-t border-b border-gray-200 py-4">
                        <div className="flex items-center">
                            <span className="w-40 font-semibold text-gray-700">Brand:</span>
                            <span className="text-gray-600">Gadget Zone</span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-40 font-semibold text-gray-700">Condition:</span>
                            <span className="text-gray-600">New</span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-40 font-semibold text-gray-700">Reference:</span>
                            <span className="text-gray-600">Product1</span>
                        </div>

                        <div className="flex items-center">
                            <span className="w-40 font-semibold text-gray-700">Available In Stock:</span>
                            <span className="text-green-500">244 items</span>
                        </div>

                        <div>
                            <p className="text-gray-700">
                                Hurry up! only <span className="text-red-500">244</span> items left in stock!
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
                                <span className="w-24 font-semibold text-gray-700">Color:</span>
                                <span className="text-gray-600">{selectedColor}</span>
                            </div>
                            <div className="flex space-x-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                                        onClick={() => setSelectedColor(color.name)}
                                        aria-label={`Select ${color.name} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Dimension */}
                        <div className="flex items-center">
                            <span className="w-24 font-semibold text-gray-700">Dimension:</span>
                            <span className="text-gray-600">60x90cm</span>
                        </div>

                        <div className="relative w-40">
                            <select className="w-full p-2 border border-gray-300 rounded appearance-none">
                                <option>60x90cm</option>
                                <option>70x100cm</option>
                                <option>80x120cm</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center">
                                <span className="text-gray-500 line-through text-lg">$47.00</span>
                                <span className="text-2xl font-bold text-red-500 ml-2">$42.00</span>
                                <span className="ml-2 bg-red-100 text-red-500 px-2 py-1 text-xs rounded">SAVE $5.00</span>
                            </div>

                            <p className="text-sm text-gray-500">Free Shipping (Est. Delivery Time 2-3 Days)</p>

                            {/* Quantity and Add to Cart */}
                            <div className="flex space-x-4">
                                <div className="flex border border-gray-300 rounded">
                                    <button className="px-3 py-2 border-r border-gray-300" onClick={decrementQuantity}>
                                        <FiMinus />
                                    </button>
                                    <input type="text" value={quantity} readOnly className="w-12 text-center" />
                                    <button className="px-3 py-2 border-l border-gray-300" onClick={incrementQuantity}>
                                        <FiPlus />
                                    </button>
                                </div>

                                <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition duration-200">Thêm vào giỏ hàng</button>
                            </div>

                            {/* In Stock Badge */}
                            <div className="text-green-500 border border-green-500 px-3 py-2 text-sm rounded w-35 text-center">Trong cửa hàng</div>

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
                                <div className="border border-gray-100 bg-gray-50 p-4 rounded flex">
                                    <div className="mr-4 text-orange-400 text-2xl">🔒</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Security policy</h3>
                                        <p className="text-sm text-gray-600">(edit with the Customer Reassurance module)</p>
                                    </div>
                                </div>

                                <div className="border border-gray-100 bg-gray-50 p-4 rounded flex">
                                    <div className="mr-4 text-orange-400 text-2xl">🚚</div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700">Delivery policy</h3>
                                        <p className="text-sm text-gray-600">(edit with the Customer Reassurance module)</p>
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
                    <div className="prose max-w-none border border-gray-200 px-10 py-6 rounded font-sans bg-white">
                        <p className="text-[16px] leading-relaxed"> 
                            Biểu tượng của sự nhẹ nhàng và tinh tế, chim ruồi gợi lên sự tò mò và niềm vui. Bộ sưu tập PolyFaune của Studio 
                            Design bao gồm các sản phẩm kinh điển với họa tiết đầy màu sắc, lấy cảm hứng từ nghệ thuật origami truyền thống 
                            của Nhật Bản. Thích hợp để phối cùng quần chino hoặc jeans. Quy trình in vải thăng hoa mang lại chất lượng màu 
                            sắc tuyệt vời và độ bền màu theo thời gian. 
                        </p> 
                        <p className="font-semibold mt-4 mb-2"> 
                            Đoạn Lorem Ipsum tiêu chuẩn, được sử dụng từ những năm 1500 
                        </p> 
                        <p className="text-[16px] leading-relaxed"> 
                            Thời trang đã sáng tạo ra các bộ sưu tập thiết kế đẹp từ năm 2010. Thương hiệu mang đến những thiết kế nữ 
                            tính với các món đồ thời trang riêng biệt và những chiếc đầm nổi bật, kể từ đó đã phát triển thành một bộ sưu 
                            tập thời trang đầy đủ trong đó mỗi món đều là phần thiết yếu trong tủ đồ của phụ nữ. Kết quả? Những bộ 
                            trang phục mát mẻ, dễ mặc, thời thượng với nét thanh lịch trẻ trung. 
                        </p> 
                        <p className="font-semibold mt-4 mb-2"> 
                            Trái với suy nghĩ phổ biến, Lorem Ipsum không chỉ là một đoạn văn ngẫu nhiên. 
                        </p>
                        <p className="text-[16px] leading-relaxed"> 
                            Nhiều phần mềm xuất bản trên máy tính để bàn và các trình chỉnh sửa trang web hiện nay sử dụng Lorem 
                            Ipsum như một văn bản mẫu mặc định, và khi tìm kiếm "lorem ipsum", bạn sẽ thấy rất nhiều trang web vẫn 
                            còn trong giai đoạn sơ khai. Nhiều phiên bản đã phát triển theo thời gian, đôi khi do vô tình, đôi khi có chủ ý 
                            (chèn thêm sự hài hước và những yếu tố tương tự). 
                        </p>
                    </div>
                )}

                {activeTab === "details" && (
                    <div>
                        {/* Data Sheet Section */}
                        <ProductDataSheet specifications={productSpecifications} />
                    </div>
                )}
                </div>
            </div>

            {/* Related Products Section */}
            <ProductCarousel products={products}/>

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
                            Có nhiều phiên bản khác nhau của các đoạn văn Lorem Ipsum, nhưng phần lớn đã bị
                            thay đổi ở một số dạng, bằng cách thêm yếu tố hài hước hoặc các từ ngẫu nhiên trông không có vẻ
                            đáng tin chút nào. Nếu bạn định sử dụng một đoạn văn bản Lorem Ipsum, bạn cần đảm bảo rằng không có điều gì đáng xấu hổ ẩn trong nội dung của nó.
                        </p>
                        <div className="mt-4 text-sm text-gray-500">✓ 2 trong số 2 người thấy đánh giá này hữu ích.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
