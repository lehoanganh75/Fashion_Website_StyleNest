import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductItem/ProductCard'
import ProductListHeader from '../ProductListHeader/ProductListHeader'

const ProductGrid = ({ filters }) => {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [filteredProducts, setFilteredProducts] = useState([])

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

  useEffect(() => {
    setFilteredProducts(products)
  }, [])

  useEffect(() => {
    if (filters) {
      const result = [...products]
      result.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
          case "price-high":
            return (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
          case "rating":
            return b.rating - a.rating
          default:
            return 0
        }
      })

      setFilteredProducts(result)
    }
  }, [filters, sortBy])

  return (
    <div>
      <div className="pb-4 border-b border-gray-200 mb-6 font-sans">
        <h1 className='font-medium text-3xl text-gray-900 mb-2'>Smart Tablet</h1>
        <p className='text-gray-500 text-sm mb-2'>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their.</p>
      </div>

      <ProductListHeader totalProducts={products.length} onViewChange={setViewMode} onSortChange={setSortBy} />

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            : "flex flex-col gap-4"
        }
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} listView={viewMode === "list"} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
