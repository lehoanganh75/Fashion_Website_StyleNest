import { Link } from "react-router-dom";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
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

export default function BlogCategories() {
  return (
    <div className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh mục bài viết</h2>
      <div>
        {categories.map((category) => (
          <div key={category.id} className="mb-4">
            <Link
              to={`/category/${category.id}`}
              className="text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors duration-200"
            >
              {category.name}
            </Link>
            <ul className="mt-2 ml-5 list-disc text-sm text-gray-600 space-y-1">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <Link
                    to={`/category/${category.id}/${subcategory.id}`}
                    className="hover:text-red-500 transition-colors duration-150"
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
}
