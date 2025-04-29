"use client"

import { useState } from "react"

const LoginForm = ({ onSwitchToRegister }) => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const showForgotPasswordForm = () => setIsForgotPassword(true)
    const hideForgotPasswordForm = () => setIsForgotPassword(false)

    return (
        <>
            {!isForgotPassword ? (
            <>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center text-gray-800">
                        Chào mừng trở lại StyleNest
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Chào mừng bạn đến với trang web mại điện tử của chúng tôi! <br /> Chúng tôi rất vui khi được gặp lại bạn.
                    </p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Tài khoản</label>
                        <input
                            type="text"
                            placeholder="Nhập tài khoản của bạn"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu của bạn"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 flex items-center justify-center"
                                >
                                <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} text-xl`}></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-sm text-gray-600">
                                Nhớ mật khẩu
                            </label>
                        </div>
                        <button type="button" onClick={showForgotPasswordForm} className="text-sm text-gray-600 hover:underline">
                            Quên mật khẩu?
                        </button>
                    </div>

                    <button
                        type="button"
                        className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                        >
                        Đăng nhập
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Bạn chưa có tài khoản?{" "}
                            <button
                                type="button"
                                onClick={onSwitchToRegister}
                                className="text-gray-800 font-medium hover:underline"
                                >
                                Đăng ký ngay
                            </button>
                        </p>
                    </div>

                    <div className="flex items-center justify-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <div className="px-4 text-gray-500 font-medium">Hoặc</div>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 
                                    text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all duration-300 bg-gray-200"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                            {/* Google: màu đỏ chủ đạo */}
                            <span className="font-medium">Đăng nhập với Google</span>
                        </button>

                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 
                                    text-gray-700 hover:bg-gray-100 hover:shadow-md transition-all duration-300 bg-gray-200"
                        >
                            <i className="bx bxl-facebook-circle text-blue-600 text-2xl"></i> 
                            {/* Facebook: màu xanh dương đậm */}
                            <span className="font-medium">Đăng nhập với Facebook</span>
                        </button>
                    </div>
                </form>
            </>
            ) : (
            // Forgot Password Form
            <>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center text-gray-800">
                        Đặt lại mật khẩu của bạn
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
                    </p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full bg-gray-800 text-white py-4 rounded-xl hover:bg-gray-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                        >
                        Gửi liên kết đặt lại
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Bạn còn nhớ mật khẩu không?
                            <button
                                type="button"
                                onClick={hideForgotPasswordForm}
                                className="text-gray-800 font-medium hover:underline ml-0.5"
                                >
                                Quay lại đăng nhập
                            </button>
                        </p>
                    </div>
                </form>
            </>
        )}
        </>
    )
}

export default LoginForm
