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
       <nav className="bg-white shadow-lg max-w-full">
        <div
          className="max-w-full px-8 flex items-center justify-between font-semibold text-sm py-1"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {/* Category button */}
          <button
            onClick={openCategoryPanel}
            className="w-3xs text-gray-800 hover:text-orange-500 flex items-center gap-3 px-4 py-2 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Menu className="h-8 w-8" />
            <span className="text-left w-full">Danh mục</span>
            <ChevronDown className="h-6 w-6" />
          </button>

          {/* Navigation Links */}
          <div className="flex justify-start flex-1 mx-4">
            <ul className="flex justify-start gap-6">
              {[
                { label: "Trang chủ", link: "/" },
                { label: "Thời trang", link: "/product" },
                { label: "Hàng mới về", link: "/product" },
                { label: "Tất cả thương hiệu", link: "/brands" },
                { label: "Ưu đãi tốt", link: "/product" },
                { label: "Blog", link: "/blog" },
              ].map((item, index) => (
                <li key={index}>
                  <Link to={item.link}>
                    <button className="text-gray-800 hover:text-orange-500 font-semibold transition-all duration-300 py-2">
                      {item.label}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* International Shipping */}
          <div className="flex justify-end px-3">
            <p className="text-gray-700 flex items-center gap-2 font-semibold whitespace-nowrap">
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
