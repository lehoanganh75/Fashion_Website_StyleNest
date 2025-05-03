import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import hook to get URL parameters
import ProductCard from '../ProductItem/ProductCard';
import ProductListHeader from '../ProductListHeader/ProductListHeader';

const ProductGrid = ({ filters, products }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams(); // Get URL parameters
  const searchTerm = searchParams.get('name'); // Extract the 'name' parameter

  useEffect(() => {
    let result = [...products];

    // Lọc theo tên (search term)
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo danh mục (category)
    if (filters?.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Lọc theo khoảng giá
    if (filters?.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(product => {
        const price = product.price * (1 - product.discount / 100) || product.price;
        return price >= min && price <= max;
      });
    }

    // Sắp xếp theo tùy chọn
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price * (1 - a.discount / 100) || a.price) - (b.price * (1 - b.discount / 100) || b.price);
        case 'price-high':
          return (b.price * (1 - b.discount / 100) || b.price) - (a.price * (1 - a.discount / 100) || a.price);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [filters, sortBy, products, searchTerm]); // Add searchTerm to the dependency array

  return (
    <div className="font-['Roboto']">
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
  );
};

export default ProductGrid;