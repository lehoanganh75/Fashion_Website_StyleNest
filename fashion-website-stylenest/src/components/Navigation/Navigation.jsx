import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, Rocket } from "lucide-react"
import CategoryPanel from "./CategoryPanel";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false)

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true)
  }

  return (
    <div>
       <nav className="bg-white shadow-lg">
        <div
          className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8 font-semibold text-sm"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {/* Category button */}
          <button
            onClick={openCategoryPanel}
            variant="ghost"
            className="text-gray-800 hover:text-orange-500 flex items-center gap-2 transition-all duration-300 hover:scale-105 whitespace-nowrap font-semibold"
          >
            <Menu className="h-5 w-5" />
            Danh mục
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>

          {/* Navigation Links */}
          <div className="flex justify-center flex-1 mx-4">
            <ul className="flex w-full justify-between">
              {[
                { label: "Trang chủ", link: "/" },
                { label: "Thời trang", link: "/product" },
                { label: "Hàng mới về", link: "/newProduct" },
                { label: "Tất cả thương hiệu", link: "/brands" },
                { label: "Ưu đãi tốt", link: "/deals" },
                { label: "Blog", link: "/blog" },
              ].map((item, index) => (
                <li key={index} className="flex-1 text-center">
                  <Link to={item.link} className="block w-full">
                    <button
                      variant="ghost"
                      className="text-gray-800 hover:text-orange-500 text-sm font-semibold transition-all duration-300 w-full py-2"
                    >
                      {item.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* International Shipping */}
          <div className="flex justify-end">
            <p className="text-gray-700 flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
              <Rocket className="h-5 w-5 text-orange-500" />
              Giao hàng quốc tế miễn phí
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
    </div>
  );
};

export default Navigation;
