import React, { useState, useCallback, useMemo } from 'react';
import ProductCard from '../ProductItem/ProductCard';

const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const ProductGridHome = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const applyFilter = useCallback((type, productsList) => {
    let result = [...productsList];
    switch (type) {
      case 't-shirt':
        result = productsList.filter(p => p.type.toLowerCase() === 'áo thun');
        break;
      case 'jeans':
        result = productsList.filter(p => p.type.toLowerCase() === 'quần jeans');
        break;
      case 'new':
        result = shuffleArray(productsList.filter(p => p.condition));
        break;
      default:
        result = shuffleArray(productsList);
    }
    return result.slice(0, 20);
  }, []);

  const filteredProducts = useMemo(() => {
    return applyFilter(activeFilter, products);
  }, [activeFilter, products, applyFilter]);

  const handleFilterClick = (filterKey) => {
    setActiveFilter(filterKey);
  };

  return (
    <div className="space-y-4 font-['Roboto']">
      <div className="flex flex-wrap items-center gap-3 mt-0">
        <p className="text-lg font-semibold text-gray-800 mr-4">Sản phẩm nổi bật nhất:</p>
        {[
          { key: 'all', label: 'Tất cả' },
          { key: 't-shirt', label: 'Áo thun' },
          { key: 'jeans', label: 'Quần Jeans' },
          { key: 'new', label: 'Hàng mới' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleFilterClick(key)}
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
  );
};

export default ProductGridHome;