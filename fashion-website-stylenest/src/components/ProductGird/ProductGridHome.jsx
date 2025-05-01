import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductItem/ProductCard'
import data from '../../data/data.json';

const ProductGridHome = () => {
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Shuffle data và lấy 20 sản phẩm đầu tiên
    const shuffled = [...data].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 20)
  
    setProducts(selected)
    applyFilter(activeFilter, selected)
  }, [activeFilter])

  const applyFilter = (type, productsList = products) => {
    let result = [...productsList]
    switch (type) {
      case 'inStock':
        result = productsList.filter(p => p.instock > 0)
        break
      case 'discount':
        result = productsList.filter(p => p.discount && p.discount > 0)
        break
      case 'new':
        result = productsList.filter(p => p.condition)
        break
      default:
        result = productsList
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
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${
              activeFilter === key
                ? 'bg-[#444444] text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200'
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
