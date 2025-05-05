import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [features, setFeatures] = useState([]);
    const [instagramPosts, setInstagramPosts] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    accountsRes,
                    bannersRes,
                    blogsRes,
                    customersRes,
                    featuresRes,
                    instaRes,
                    orderDetailsRes,
                    ordersRes,
                    productsRes,
                    usersRes
                ] = await Promise.all([
                    axios.get('http://localhost:5000/api/accounts'),
                    axios.get('http://localhost:5000/api/banners'),
                    axios.get('http://localhost:5000/api/blogs'),
                    axios.get('http://localhost:5000/api/customers'),
                    axios.get('http://localhost:5000/api/features'),
                    axios.get('http://localhost:5000/api/instagramPosts'),
                    axios.get('http://localhost:5000/api/orderDetails'),
                    axios.get('http://localhost:5000/api/orders'),
                    axios.get('http://localhost:5000/api/products'),
                    axios.get('http://localhost:5000/api/users'),
                ]);              
                setAccounts(accountsRes.data);
                setBanners(bannersRes.data);
                setBlogs(blogsRes.data);
                setCustomers(customersRes.data);
                setFeatures(featuresRes.data);
                setInstagramPosts(instaRes.data);
                setOrderDetails(orderDetailsRes.data);
                setOrders(ordersRes.data);
                setProducts(productsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error('Lỗi khi load dữ liệu:', error);
            }
        };
    
        fetchData();
    }, []);

    const saveAccount = async (newAccount) => {
        try {
            const response = await axios.post('http://localhost:5000/api/accounts', newAccount);
            setAccounts((prevAccounts) => [...prevAccounts, response.data]);
        } catch (error) {
            console.error('Lỗi khi lưu tài khoản:', error);
        }
    }

    const updateAccount = async (updatedAccount) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/accounts/${updatedAccount.id}`, updatedAccount);
            setAccounts((prevAccounts) =>
                prevAccounts.map(account => account.id === updatedAccount.id ? response.data.updatedAccount : account)
            );
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
        }
    };

    return (
        <DataContext.Provider value={{
            accounts,
            setAccounts,
            saveAccount,
            updateAccount,
            banners,
            blogs,
            customers,
            features,
            instagramPosts,
            orderDetails,
            orders,
            setOrders,
            products,
            setProducts,
            users,
        }}>
            {children}
        </DataContext.Provider>
    );
  };
  
  export const useData = () => useContext(DataContext);