import React, { useState, useEffect } from 'react'
import ProductCard from '../ProductItem/ProductCard'
import ProductListHeader from '../ProductListHeader/ProductListHeader'
import data from '../../data/data.json'

const ProductGrid = ({ filters }) => {
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(data)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Lọc theo danh mục (category)
    if (filters?.category) {
      result = result.filter(product => product.category === filters.category)
    }

    // Lọc theo khoảng giá
    if (filters?.priceRange) {
      const [min, max] = filters.priceRange
      result = result.filter(product => {
        const price = product.discountedPrice || product.price
        return price >= min && price <= max
      })
    }

    // Sắp xếp theo tùy chọn
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        case 'price-high':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    setFilteredProducts(result)
  }, [filters, sortBy, products])

  return (
    <div className="font-['Roboto']">
      <div className="pb-4 border-b border-gray-200 mb-2 font-sans">
        <h1 className="font-medium text-3xl text-gray-900 mb-2">Sản phẩm</h1>
        <p className="text-gray-500 text-sm mb-2">
          Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định và tìm kiếm 'lorem ipsum' sẽ phát hiện ra nhiều trang web vẫn còn trong đó.
        </p>
      </div>

      <ProductListHeader
        totalProducts={filteredProducts.length}
        onViewChange={setViewMode}
        onSortChange={setSortBy}
      />

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-4'
        }
      >
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} listView={viewMode === 'list'} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid;