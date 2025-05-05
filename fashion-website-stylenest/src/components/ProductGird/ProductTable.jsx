import React, { useEffect, useState } from 'react';
import TransactionsTableProduct from "../TransactionsTable/TransactionsTableProduct";
import { useData } from '../../contexts/DataContext';
import axios from 'axios';

const ProductTable = () => {
  const { products, setProducts } = useData(); // Đảm bảo bạn có setProducts để cập nhật lại dữ liệu
  const [loading, setLoading] = useState(true);

  // Lấy lại dữ liệu từ API sau khi thực hiện thao tác
  const refreshProducts = async () => {
    try {
      setLoading(true); // Set trạng thái loading
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data); // Cập nhật lại dữ liệu sản phẩm
    } catch (error) {
      console.error("Lỗi khi tải lại dữ liệu sản phẩm", error);
    } finally {
      setLoading(false); // Tắt loading khi lấy xong dữ liệu
    }
  };

  // Dùng useEffect để cập nhật khi có thay đổi dữ liệu (nếu có)
  useEffect(() => {
    refreshProducts();
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  return (
    <div className="p-4 w-full">
      {loading ? (
        <p>Đang tải...</p> // Hiển thị trạng thái loading nếu đang lấy dữ liệu
      ) : (
        <TransactionsTableProduct products={products} />
      )}
    </div>
  );
};

export default ProductTable;
