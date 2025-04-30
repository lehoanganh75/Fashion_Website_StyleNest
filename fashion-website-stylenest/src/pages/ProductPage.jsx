import React from "react";
import ProductGrid from "../components/ProductGird/ProductGrid";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const ProductPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Fashion", href: "/fashion" },
    { label: "Apparel", href: "/fashion/apparel" },
    { label: "Smart Tablet", href: "#" },
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
