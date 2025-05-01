import React from "react";
import ProductGrid from "../components/ProductGird/ProductGrid";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const ProductPage = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Thời trang", href: "/product" }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w mx-auto px-10 py-10 font-sans bg-white border-t border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar />
          </div>
          <div className="flex-grow">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
