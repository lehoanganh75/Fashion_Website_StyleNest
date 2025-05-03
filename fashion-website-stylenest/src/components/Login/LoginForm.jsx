import { useState } from "react";
import { Eye, EyeOff, Facebook } from "lucide-react";
import RegisterForm from "./RegisterForm";
import account from '../../data/account.json'; // Dữ liệu đã được import

const LoginForm = ({ isOpen, onClose, onSwitchToRegister, initialView = "login" , onLoginSuccess }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [currentView, setCurrentView] = useState(initialView); // "login", "register", or "forgot"
  const [loginError, setLoginError] = useState("");
  const accounts = account; // Sử dụng trực tiếp dữ liệu đã import

  if (!isOpen) return null;

  const handleSwitchToRegister = () => {
    if (onSwitchToRegister) {
      onSwitchToRegister();
    } else {
      setCurrentView("register");
    }
    setLoginError("");
  };

  const handleSwitchToLogin = () => {
    setCurrentView("login");
    setLoginError("");
    setUser("");
    setPassword("");
    setEmail("");
  };

  const handleSwitchToForgotPassword = () => {
    setCurrentView("forgot");
    setLoginError("");
    setEmail("");
  };


  const handleLogin = (e) => {
    e.preventDefault();

    const foundAccount = accounts.find(
      (acc) => acc.taiKhoan === user && acc.matKhau === password
    );

    if (foundAccount) {
      console.log("Đăng nhập thành công!", foundAccount);
      setLoginError("");
      onClose();
      // Gọi một hàm callback để thông báo cho component cha và truyền thông tin tài khoản
      if (onLoginSuccess) {
        onLoginSuccess(foundAccount); // Truyền toàn bộ đối tượng tài khoản
        // Hoặc chỉ truyền tên: onLoginSuccess(foundAccount.taiKhoan);
      }
    } else {
      setLoginError("Tài khoản hoặc mật khẩu không đúng.");
    }
  };


  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Yêu cầu đặt lại mật khẩu cho email:", email);
    setCurrentView("login");
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/30 backdrop-blur-md border">
      <div className="relative w-full max-w-lg mx-4 p-6 bg-white border border-gray-300 rounded-2xl shadow-2xl animate-in fade-in-50 zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {currentView === "register" ? (
          <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
        ) : currentView === "login" ? (
          <>
            {/* ... phần render form đăng nhập (giữ nguyên) ... */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Chào mừng trở lại StyleNest</h2>
              <p className="text-gray-600">Chúng tôi rất vui khi được gặp lại bạn.</p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

              {/* Đã loại bỏ các đoạn code loading và error */}

              <>
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

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Nhớ mật khẩu
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwitchToForgotPassword}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 text-lg font-medium shadow-md"
                >
                  Đăng nhập
                </button>

                <p className="text-center text-gray-600 mt-4">
                  Bạn chưa có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={handleSwitchToRegister}
                    className="text-gray-800 font-medium hover:underline"
                  >
                    Đăng ký ngay
                  </button>
                </p>

                <div className="flex items-center justify-center my-6">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-gray-500 font-medium">Hoặc</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="space-y-4">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 text-gray-700 bg-gray-200 hover:bg-gray-100 shadow-sm"
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Đăng nhập với Google</span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 px-4 text-gray-700 bg-gray-200 hover:bg-gray-100 shadow-sm"
                  >
                    <Facebook className="text-blue-600 h-5 w-5" />
                    <span className="font-medium">Đăng nhập với Facebook</span>
                  </button>
                </div>
              </>
            </form>
          </>
        ) : (
          <>
            {/* ... phần render form quên mật khẩu (giữ nguyên) ... */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Đặt lại mật khẩu</h2>
              <p className="text-gray-600">Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.</p>
            </div>

            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <div className="space-y-2">
                <label htmlFor="resetEmail" className="block text-gray-700 font-medium">
                  Email
                </label>
                <input
                  id="resetEmail"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 text-lg font-medium shadow-md"
              >
                Gửi liên kết đặt lại
              </button>

              <p className="text-center text-gray-600 mt-4">
                Bạn còn nhớ mật khẩu?{" "}
                <button
                  type="button"
                  onClick={handleSwitchToLogin}
                  className="text-gray-800 font-medium hover:underline"
                >
                  Quay lại đăng nhập
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;