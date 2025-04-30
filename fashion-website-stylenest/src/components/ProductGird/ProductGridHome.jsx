import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductItem/ProductCard'

const ProductGridHome = () => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

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
      image: "/imgs/aopolonamdangrong2.jpg",
      colors: ["grey", "green", "yellow"],
      size: "medium",
      availability: "inStock",
      condition: "new",
      dimension: "60x90cm",
      description:
        "We denounce with righteous indignation and dislike men who are so beguiled...",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
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
      image: "/imgs/aopolonamdangrong2.jpg",
      colors: ["black", "orange"],
      size: "large",
      availability: "inStock",
      condition: "new",
    },
  ]

  useEffect(() => {
    applyFilter(activeFilter)
  }, [activeFilter])

  const applyFilter = (type) => {
    let result = [...products]
    switch (type) {
      case 'inStock':
        result = products.filter(p => p.availability === 'inStock')
        break
      case 'discount':
        result = products.filter(p => p.discount && p.discount > 0)
        break
      case 'new':
        result = products.filter(p => p.isNew)
        break
      case 'used':
        result = products.filter(p => p.condition === 'used')
        break
      case 'refurbished':
        result = products.filter(p => p.condition === 'refurbished')
        break
      default:
        result = products
    }
    setFilteredProducts(result)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 my-6">
        <p className="text-lg font-semibold text-gray-800 mr-4">Sản phẩm nổi bật nhất:</p>

        {[
          { key: 'all', label: 'Tất cả' },
          { key: 'inStock', label: 'Còn hàng' },
          { key: 'discount', label: 'Giảm giá' },
          { key: 'new', label: 'Hàng mới' },
          { key: 'used', label: 'Đã dùng' },
          { key: 'refurbished', label: 'Tân trang' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${
              activeFilter === key
                ? 'bg-[#444444] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGridHome
