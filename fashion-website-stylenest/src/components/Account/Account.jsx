import React, { useEffect, useState } from 'react'
import TransactionsTableAccount from "../TransactionsTable/TransactionsTableAccount"
import { useData } from '../../contexts/DataContext';
import axios from 'axios';

const Account = () => {
  const { accounts, setAccounts, saveAccount, updateAccount, deleteAccount } = useData();
  const [loading, setLoading] = useState(true);

  const refreshAccounts = async () => {
    try {
      setLoading(true); // Set trạng thái loading
      const response = await axios.get("https://fashion-website-stylenest.onrender.com/api/accounts");
      setAccounts(response.data); // Cập nhật lại dữ liệu sản phẩm
    } catch (error) {
      console.error("Lỗi khi tải lại dữ liệu sản phẩm", error);
    } finally {
      setLoading(false); // Tắt loading khi lấy xong dữ liệu
    }
  };

  // Dùng useEffect để cập nhật khi có thay đổi dữ liệu (nếu có)
  useEffect(() => {
    refreshAccounts();
  }, []); // Chỉ chạy một lần khi component được render lần đầu

  return (
    <div className="p-4 w-full">
      {loading ? (
        <p>Đang tải...</p> // Hiển thị trạng thái loading nếu đang lấy dữ liệu
      ) : (
        <TransactionsTableAccount accounts={accounts} saveAccount={saveAccount} updateAccount={updateAccount} deleteAccount={deleteAccount}/>
      )}
    </div>
  )
}

export default Account
