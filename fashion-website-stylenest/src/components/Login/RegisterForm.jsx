import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

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
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Tài khoản
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tài khoản của bạn"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            />
          </div>
  
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            />
          </div>
  
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
  
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu của bạn"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
  
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded border-gray-300 text-gray-900 focus:ring-gray-500" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Tôi đồng ý với <span className="text-gray-600 hover:underline cursor-pointer">điều khoản dịch vụ</span> và{" "}
              <span className="text-gray-600 hover:underline cursor-pointer">chính sách bảo mật</span>
            </label>
          </div>
  
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 text-lg font-medium shadow-md"
          >
            Đăng ký
          </button>
  
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Bạn đã có tài khoản?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-gray-800 font-medium hover:underline">
                Đăng nhập
              </button>
            </p>
          </div>
        </form>
      </>
    )
}

export default RegisterForm;