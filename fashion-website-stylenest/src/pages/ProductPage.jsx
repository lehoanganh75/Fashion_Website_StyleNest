import React, { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGird/ProductGrid";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import data from '../data/data.json';
import { useParams } from "react-router-dom";

const categoryLabels = {
  fashion: "Thời trang",
  new: "Hàng mới về",
  deal: "Ưu đãi tốt",
};

const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const currentLabel = categoryLabels[category] || "Sản phẩm";
  
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: currentLabel, href: `/product/${category}` },
  ];

  useEffect(() => {
    let filteredProducts = data;
  
    if (category === "new") {
      const now = new Date();
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);

      console.log("Current date:", now);
      console.log("One month ago:", oneMonthAgo);
  
      filteredProducts = data.filter((product) => {
        const importDate = new Date(product.dateAdded);
        return importDate >= oneMonthAgo && importDate <= now;
      });
    } else if (category === "deal") {
      filteredProducts = data.filter((product) => {
        const discount = product.discount || 0;
        return discount >= 15 && discount <= 40;
      });
    }
  
    setProducts(filteredProducts);
  }, [category]);  

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w mx-auto px-10 py-10 font-sans bg-white border-t border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>
          <div className="flex-grow">
            <ProductGrid products={products}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
