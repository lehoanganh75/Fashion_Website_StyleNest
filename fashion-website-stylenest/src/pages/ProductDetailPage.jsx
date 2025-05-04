import React from 'react';
import ProductDetail from '../Components/ProductDetail/ProductDetail';
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const categoryLabels = {
  fashion: "Thời trang",
  new: "Hàng mới về",
  deal: "Ưu đãi tốt",
};

const ProductDetailPage = () => {
  const { id, category } = useParams();
  const { products } = useData(); 
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <div className="p-10">Sản phẩm không tồn tại</div>;
  }

  console.log(category, id);

  const currentLabel = categoryLabels[category] || "Sản phẩm";

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: currentLabel, href: `/product/${category}` },
    { label: product.name, href: `/product/${category}/${product.id}` }
  ];

  return (
    <div className="bg-white">
      <Breadcrumb items={breadcrumbItems} />
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
