"use client"

import { useState } from "react"

const RegisterForm = ({ onSwitchToLogin }) => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center text-gray-800">
                    Tham gia với StyleNest
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Tạo tài khoản để khám phá thế giới mua sắm trực tuyến tuyệt vời.
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
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu của bạn"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 flex items-center justify-center"
                            >
                            <i className={`bx ${showConfirmPassword ? 'bx-show' : 'bx-hide'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        Tôi đồng ý với 
                        <span className="text-gray-600"> điều khoản dịch vụ </span> 
                        và 
                        <span className="text-gray-600"> chính sách bảo mật </span>
                    </label>
                </div>

                <button
                    type="button"
                    className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                    >
                    Đăng ký
                </button>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Bạn đã có tài khoản? 
                        <button type="button" onClick={onSwitchToLogin} className="text-gray-800 font-medium hover:underline ml-0.5">
                        Đăng nhập
                        </button>
                    </p>
                </div>
            </form>
        </>
    )
}

export default RegisterForm
