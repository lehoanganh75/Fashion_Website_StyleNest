import { Link } from "react-router-dom";

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
    <div className="border border-gray-200 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Danh mục bài viết</h2>
      <div>
        {categories.map((category) => (
          <div key={category.id} className="mb-6">
            <Link
              to={`/category/${category.id}`}
              className="text-xl font-semibold text-gray-800 hover:text-red-600 transition-all duration-300 ease-in-out"
            >
              {category.name}
            </Link>
            <ul className="mt-4 ml-6 list-inside list-disc text-sm text-gray-600 space-y-2">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    to={`/category/${category.id}/${subcategory.id}`}
                    className="text-gray-700 hover:text-red-500 hover:underline transition-colors duration-150"
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
