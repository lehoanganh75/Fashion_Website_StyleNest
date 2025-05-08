import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = ({ onSwitchToLogin, accounts, saveAccount }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!user.trim()) {
      newErrors.user = "Tài khoản không được để trống.";
    }

    if (!email.trim()) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password.trim()) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted =
        "Bạn phải chấp nhận điều khoản dịch vụ và chính sách bảo mật.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      const newAccount = {
        id: Math.max(...accounts.map((a) => a.id || 0), 0) + 1,
        userName: user,
        password: password,
        email: email,
        role: "customer",
      };
      console.log("Đăng ký thành công!", newAccount);
      saveAccount(newAccount);
      // Chuyển sang form đăng nhập sau khi đăng ký thành công
      onSwitchToLogin();
    }
  };

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

      <form className="space-y-4" onSubmit={handleRegister}>
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
            className={`w-full border ${
              errors.user ? "border-red-500" : "border-gray-200"
            } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200`}
          />
          {errors.user && <p className="text-red-500 text-sm">{errors.user}</p>}
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
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu của bạn"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              } rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            className={`rounded border-gray-300 text-gray-900 focus:ring-gray-500 ${
              errors.termsAccepted ? "border-red-500" : ""
            }`}
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <span className="text-gray-600 hover:underline cursor-pointer">
              điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span className="text-gray-600 hover:underline cursor-pointer">
              chính sách bảo mật
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-sm">{errors.termsAccepted}</p>
          )}
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
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-gray-800 font-medium hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;