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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
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
            // Send the new account to the backend
            const response = await axios.post('http://localhost:5000/api/accounts', newAccount);
            console.log("Lưu tài khoản thành công:", response.data);
            // Fetch the updated list of accounts after the new one is saved
            const updatedAccounts = await axios.get('http://localhost:5000/api/accounts');
        
            // Update the state with the newly fetched list
            setAccounts(updatedAccounts.data);
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

    const deleteAccount = async (accountId) => {
        try {
            await axios.delete(`http://localhost:5000/api/accounts/${accountId}`);
            setAccounts((prevAccounts) =>
                prevAccounts.filter(account => account.id !== accountId)
            );
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
        }
    };

    const saveProduct = async (productData, imageFiles) => {
        try {
            const formData = new FormData();
            formData.append("product", JSON.stringify(productData));
            
            imageFiles.forEach(file => {
                formData.append("images", file); // thêm từng ảnh vào field images
            });
    
            const response = await axios.post(
                'http://localhost:5000/api/products',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Đã lưu sản phẩm:", response.data);
    
            const updatedProducts = await axios.get('http://localhost:5000/api/products');
            setProducts(updatedProducts.data);
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
        }
    };   
    
    const updateProduct = async (productData, newImageFiles = [], oldImageURLs = []) => {
        try {
            const formData = new FormData();
    
            // Cập nhật thumbnails (kết hợp ảnh cũ và mới)
            const updatedThumbnails = [...oldImageURLs, ...newImageFiles.map(file => `${file.name}`)];
            productData.thumbnails = updatedThumbnails;
    
            // Chuyển productData thành chuỗi JSON và append vào FormData
            formData.append("product", JSON.stringify(productData));
    
            // Thêm ảnh mới vào FormData
            newImageFiles.forEach(file => {
                formData.append("images", file);
            });
    
            console.log("Updated thumbnails:", productData.thumbnails);
    
            const response = await axios.put(
                `http://localhost:5000/api/products/${productData.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            console.log("Sản phẩm đã được cập nhật:", response.data);
    
            // Lấy lại danh sách sản phẩm sau khi cập nhật
            const updatedProducts = await axios.get('http://localhost:5000/api/products');
            setProducts(updatedProducts.data);
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    }    

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            setProducts((prevProducts) =>
                prevProducts.filter(product => product.id !== productId)
            );
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${updatedUser.id}`, updatedUser);
            setAccounts((prevAccounts) =>
                prevAccounts.map(user => user.id === updatedUser.id ? response.data.updatedUser : user)
            );
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
        }
    };

    const searchProducts = async (searchTerm) => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/products/search?name=${searchTerm}`
          );
          setProducts(response.data);
          return response.data;
        } catch (error) {
          setError(error);
          console.error("Lỗi khi tìm kiếm sản phẩm:", error);
          setProducts([]);
          throw error;
        } finally {
          setLoading(false);
        }
      };

      
  const searchCustomers = async (phone) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/customers/search?phone=${phone}`
      );
      setCustomers(response.data);
      return response.data;
    } catch (error) {
      setError(error);
      console.error("Lỗi khi tìm kiếm khách hàng:", error);
      setCustomers([]);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchOrders = async (customerName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/search?customerName=${customerName}`
      );
      setOrders(response.data);  // Cập nhật danh sách đơn hàng
      return response.data;
    } catch (error) {
      setError(error);
      console.error("Lỗi khi tìm kiếm đơn hàng:", error);
      setOrders([]);  // Xóa danh sách đơn hàng khi có lỗi
      throw error;
    } finally {
      setLoading(false);  // Tắt loading sau khi hoàn tất
    }
  };

    const searchAccounts = async (userName) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://localhost:5000/api/accounts/search?userName=${userName}`
            );
            setAccounts(response.data);  // Cập nhật danh sách tài khoản
            return response.data;
        } catch (error) {
            setError(error);
            console.error("Lỗi khi tìm kiếm tài khoản:", error);
            setAccounts([]);  // Xóa danh sách tài khoản khi có lỗi
            throw error;
        } finally {
            setLoading(false);  // Tắt loading sau khi hoàn tất
        }
    };

    return (
        <DataContext.Provider value={{
            accounts,
            setAccounts,
            saveAccount,
            updateAccount,
            deleteAccount,
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
            saveProduct,
            updateProduct,
            deleteProduct,
            users,
            searchCustomers,
            updateUser,
            setUsers,
            searchProducts,
            searchOrders,
            searchAccounts,
        }}>
            {children}
        </DataContext.Provider>
    );
  };
  
  export const useData = () => useContext(DataContext);