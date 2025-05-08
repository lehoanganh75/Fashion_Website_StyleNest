import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert"; 
import LoginForm from '../Login/LoginForm';

const Modal = ({ handleShowModal }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const [authFormView, setAuthFormView] = useState(null); // "login" | "register" | null
    const { setLoggedInAccount } = useAuth(); 
    const [loginSuccessSnackbarOpen, setLoginSuccessSnackbarOpen] = useState(false);

    const openAuthForm = (view) => {
        setAuthFormView(view); // "login" or "register"
    };

    const handleCloseAuthForm = () => {
        setAuthFormView(null);
    };

    const handleLoginSuccess = (account) => {
        setLoggedInAccount(account); 
        setModalVisible(false);
        setAuthFormView(null);
        setLoginSuccessSnackbarOpen(true);
    };

    const handleCloseLoginSuccessSnackbar = (event, reason) => {
        if (reason === "clickaway") return;
        setLoginSuccessSnackbarOpen(false);
    };

    return (
        <div>
            {modalVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center font-['Roboto']">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                    {/* Modal content */}
                    <div className="relative bg-white border border-gray-300 p-6 md:p-10 rounded-xl shadow-xl w-full max-w-md mx-4 animate-fadeIn z-10">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Vui lòng đăng nhập</h2>
                            <p className="text-gray-600">Bạn cần đăng nhập hoặc đăng ký để thêm sản phẩm vào giỏ hàng.</p>

                            <img
                                src="/imgs/logo.png"
                                alt="Logo"
                                className="w-28 h-28 object-contain rounded-full shadow-sm"
                            />

                            <div className="flex space-x-4 pt-4">
                                <button
                                    onClick={() => openAuthForm("login")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => openAuthForm("register")}
                                    className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                                >
                                    Đăng ký
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setModalVisible(false);
                                    handleShowModal();
                                }}
                                className="mt-4 text-sm text-gray-500 hover:underline"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>

                    {/* Form login/register hiển thị cùng modal */}
                    {authFormView && (
                        <div className="absolute z-20">
                            <LoginForm
                                isOpen={!!authFormView}
                                onClose={handleCloseAuthForm}
                                initialView={authFormView}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Snackbar thông báo đăng nhập thành công */}
            <Snackbar
                open={loginSuccessSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseLoginSuccessSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    mt: 2,
                    '& .MuiPaper-root': {
                        background: 'linear-gradient(135deg, #FFA726, #FB8C00)',
                        color: '#fff',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        fontSize: '0.95rem',
                        borderRadius: '8px',
                    },
                }}
            >
                <Alert
                    onClose={handleCloseLoginSuccessSnackbar}
                    severity="success"
                    icon={false}
                    sx={{
                        width: '100%',
                        background: 'transparent',
                        color: '#fff',
                        fontWeight: 500,
                        padding: '8px 10px',
                        '& .MuiAlert-message': {
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                >
                    Đăng nhập thành công!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Modal;