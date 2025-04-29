import { useState } from "react"
import { Heart, RefreshCw, Maximize, Share2 } from "lucide-react"
import RatingStars from "../RatingStars/RatingStars"
import ProductBadge from "../ProductBadge/ProductBadge"

const ProductCard = ({ product, listView = false }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [favoriteActive, setFavoriteActive] = useState(false)

    if (listView) {
        return (
        <div
            className="border border-gray-200 p-4 relative flex flex-row h-full transition-all duration-300 hover:shadow-lg cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Product badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                {product.discount && <ProductBadge type="discount" value={product.discount} />}
            </div>

            {isHovering && (
                <div className="absolute top-10 left-2 z-10 flex flex-col gap-2">
                    {product.isNew && <ProductBadge type="new" />}
                </div>
            )}

            {/* Quick action buttons */}
            {isHovering && (
                <div className="absolute right-2 top-2 flex gap-2">
                    <button
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none cursor-pointer shadow-md transition-all duration-200 hover:bg-[#F44B87FF] group"
                    onClick={() => setFavoriteActive(!favoriteActive)}
                    >
                        <Heart
                            size={18}
                            className={`${favoriteActive ? "fill-[#F44B87FF] text-[#F44B87FF]" : "group-hover:text-white"} transition-colors`}
                        />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none cursor-pointer shadow-md transition-all duration-200 hover:bg-[#F44B87FF] group">
                        <RefreshCw size={18} className="group-hover:text-white transition-colors" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none cursor-pointer shadow-md transition-all duration-200 hover:bg-[#F44B87FF] group">
                        <Maximize size={18} className="group-hover:text-white transition-colors" />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none cursor-pointer shadow-md transition-all duration-200 hover:bg-[#F44B87FF] group">
                        <Share2 size={18} className="group-hover:text-white transition-colors" />
                    </button>
                </div>
            )}

            {/* Product image */}
            <div className="relative h-48 w-48 flex-shrink-0 flex items-center justify-center overflow-hidden group mr-4">
                <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Product info */}
            <div className="flex flex-col flex-grow">
                {/* Brand */}
                <div className="text-gray-500 text-sm mb-1">{product.brand}</div>

                {/* Product name */}
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>

                {/* Rating */}
                <div className="mb-2">
                    <RatingStars rating={product.rating} />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        {product.discountedPrice ? (
                        <>
                            <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                            <span className="text-red-500 font-medium">${product.discountedPrice.toFixed(2)}</span>
                        </>
                        ) : (
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description ||
                        "We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire that they cannot."}
                </p>

                <div className="flex gap-2">
                    {/* Stock status */}
                    <div className="text-green-500 border border-green-500 px-3 py-2 text-sm rounded">Trong của hàng</div>

                    {/* Options button */}
                    <button className="bg-[#F44B87FF] text-white font-medium py-2 px-3 rounded transition-colors cursor-pointer">
                        Xem sản phẩm
                    </button>
                </div>
            </div>
        </div>
        )
    }

return (
    <div
        className="border border-gray-200 p-4 relative flex flex-col h-full transition-all duration-300 hover:shadow-lg cursor-pointer rounded-2xl shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        >
        {/* Product badges */}
        <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
            {product.discount && <ProductBadge type="discount" value={product.discount} />}
            
        </div>

        {isHovering && (
            <div className="absolute top-12 left-5 z-10 flex flex-col gap-2">
                {product.isNew && <ProductBadge type="new" />}
            </div>
        )}

        {/* Quick action buttons */}
        {isHovering && (
            <div className="absolute right-2 top-2 flex flex-col gap-2">
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none shadow-md hover:bg-[#F44B87FF] group cursor-pointer">
                    <Heart size={18} className="text-gray-700 group-hover:text-white transition-colors" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none shadow-md hover:bg-[#F44B87FF] group cursor-pointer">
                    <RefreshCw size={18} className="text-gray-700 group-hover:text-white transition-colors" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none shadow-md hover:bg-[#F44B87FF] group cursor-pointer">
                    <Maximize size={18} className="text-gray-700 group-hover:text-white transition-colors" />
                </button>
                <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center border-none shadow-md hover:bg-[#F44B87FF] group cursor-pointer">
                    <Share2 size={18} className="text-gray-700 group-hover:text-white transition-colors" />
                </button>
            </div>
        )}


        {/* Product image */}
        <div className="relative mb-4 flex-1 flex items-center justify-center overflow-hidden group">
            <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-48 object-contain mx-auto transition-transform duration-500 group-hover:scale-110"
            />
        </div>

        {/* Product info */}
        <div className="mt-auto">
            {/* Brand */}
            <div className="text-gray-500 text-sm mb-1">{product.brand}</div>

            {/* Product name */}
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>

            {/* Rating */}
            <RatingStars rating={product.rating} />

            {/* Price */}
            <div className="mt-2 flex items-center">
            <div className="flex items-center gap-2">
                {product.discountedPrice ? (
                <>
                    <span className="text-gray-400 line-through">${product.price.toFixed(2)}</span>
                    <span className="text-red-500 font-medium">${product.discountedPrice.toFixed(2)}</span>
                </>
                ) : (
                <span className="font-medium">${product.price.toFixed(2)}</span>
                )}
            </div>
            </div>
        </div>
        </div>
    )
}

export default ProductCard
