import React from 'react'
import ProductDetail from '../Components/ProductDetail/ProductDetail'
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useParams } from 'react-router-dom';
import data from "../data/data.json";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = data.find((item) => item.id === id); 

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Thời trang", href: "/product" },
    { label: product.name, href: `/product/${product.id}` }
  ];

  return (
    <div className='bg-white'>
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetail />
    </div>
  )
}

export default ProductDetailPage
