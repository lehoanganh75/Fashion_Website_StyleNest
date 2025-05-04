import "boxicons/css/boxicons.min.css"; 
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { handleLogut } = useAuth();
  const navigate = useNavigate(); // Dùng để điều hướng sau khi logout

  const menuItems = [
    {
      section: "MENU",
      items: [
        { name: "Dashboard", icon: "bx-grid-alt", link: "/admin/dashboard" },
        { name: "Biểu đồ", icon: "bx-pie-chart-alt", link: "/admin/chart" },
        { name: "Hồ sơ người dùng", icon: "bx-user", link: "/admin/profile" },
        { name: "Sản phẩm", icon: "bx-cube", link: "/admin/product" },
        { name: "Tài khoản", icon: "bx-credit-card", link: "/admin/account" },
        { name: "Khách hàng", icon: "bx-group", link: "/admin/customer" },
        { name: "Hóa đơn", icon: "bx-receipt", link: "/admin/order" },
      ],
    },
    {
      section: "OTHERS",
      items: [
        { name: "Logout", icon: "bx-log-out", link: "/" },
      ],
    },
  ];

  const handleItemClick = async (item) => {
    if (item.name === "Logout") {
      await handleLogut(); // Gọi hàm logout
      navigate("/");        // Điều hướng sau logout (tùy bạn chọn URL)
    }
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-300 flex flex-col">
      {/* Logo */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
          <i className="bx bxs-store text-white text-2xl"></i>
        </div>
        <span className="ml-2 text-xl font-semibold">Admin</span>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="px-4 py-2 text-xs font-medium text-gray-400">{section.section}</div>
            <ul>
              {section.items.map((item, index) => (
                <div className="px-2 mb-2" key={index}>
                  {item.name === "Logout" ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="block w-full rounded-lg hover:bg-indigo-100 hover:text-indigo-600 text-gray-800"
                    >
                      <div className="w-full px-4 py-3 flex items-center space-x-3 transition-colors duration-200">
                        <i className={`bx ${item.icon} text-2xl`}></i>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </button>
                  ) : (
                    <NavLink
                      to={item.link}
                      key={item.name}
                      className={({ isActive }) =>
                        `block rounded-lg ${
                          isActive
                            ? "bg-indigo-100 text-indigo-600 font-semibold"
                            : "hover:bg-indigo-100 hover:text-indigo-600 text-gray-800"
                        }`
                      }
                    >
                      <li>
                        <button className="w-full px-4 py-3 flex items-center space-x-3 text-inherit transition-colors duration-200">
                          <i className={`bx ${item.icon} text-2xl`}></i>
                          <span className="text-sm font-medium">{item.name}</span>
                        </button>
                      </li>
                    </NavLink>
                  )}
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;