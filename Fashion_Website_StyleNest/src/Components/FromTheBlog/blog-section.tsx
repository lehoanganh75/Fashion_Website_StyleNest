import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ React Router
import blogData from "../../data/fromTheBlog.json";

export default function BlogSection() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 lg:px-0">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-8">
        📰 Tin tức mới nhất
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              <img
                src={post.imageSrc || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
            <div className="p-5">
              <div className="text-red-600 text-xs mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {`${post.date}`}
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.shortInfo}
              </p>
              {/* Thay thế <a> thành <Link> với to */}
              <Link to={`/blog/${post.id}`}>
                <a className="text-red-500 text-sm font-semibold hover:underline">
                  Đọc thêm →
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-1 items-center flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              currentPage === i + 1
                ? "bg-red-500 text-white font-bold"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
