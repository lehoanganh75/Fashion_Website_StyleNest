import React from 'react'
import EcommerceShowcase from '../components/EcommerceShowcase/EcommerceShowcase';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const BrandPage = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Thương hiệu", href: "#" }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="bg-white px-10 py-6">
        <EcommerceShowcase />
      </div>
    </div>
  )
}

export default BrandPage;
