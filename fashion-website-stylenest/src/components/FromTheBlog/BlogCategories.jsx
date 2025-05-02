import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const categories = [
  {
    id: 1,
    name: "Xu hướng thương mại điện tử",
    subcategories: [
      { id: 1, name: "Mua sắm" },
      { id: 2, name: "Thị trường số" },
    ],
  },
  {
    id: 2,
    name: "Danh mục bài viết",
    subcategories: [
      { id: 1, name: "Công nghệ" },
      { id: 2, name: "Giới thiệu sản phẩm" },
      { id: 3, name: "Kinh nghiệm mua sắm" },
    ],
  },
];

const BlogCategories = () => {
  return (
    <div className="border border-gray-200 p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        <i className="bx bx-book text-3xl"></i>
        <span>Danh mục bài viết</span>
      </h2>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id}>
            <Link
              to="/product/"
              className="text-lg md:text-xl font-semibold text-gray-900 hover:text-orange-600 transition-colors duration-300"
            >
              {category.name}
            </Link>

            <ul className="mt-3 ml-5 list-disc space-y-2 text-sm text-gray-600">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    to="/product/"
                    className="hover:text-orange-500 hover:underline transition-colors duration-150"
                  >
                    {subcategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
