import { useState } from "react";
import { Link } from "react-router-dom";
import blogData from "../../data/fromTheBlog.json";
import "boxicons/css/boxicons.min.css";

const BlogSection = () => {
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
      <h2 className="text-3xl font-medium text-gray-800 mb-8 flex items-center gap-3">
        <i className="bx bxs-news text-orange-600 text-4xl"></i> Tin tức mới
        nhất
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBlogs.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow bg-white"
          >
            <Link to={`/blog/${post.id}`}>
              <img
                src={post.imageSrc || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="p-5">
              <div className="text-orange-600 text-xs mb-3 flex items-center">
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
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 hover:text-orange-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.shortInfo}
              </p>
              {/* Thay thế <a> thành <Link> với to */}
              <Link
                to={`/blog/${post.id}`}
                className="text-orange-500 text-sm font-semibold hover:underline"
              >
                Đọc thêm <i className="bx bx-right-arrow-alt"></i>
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
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 transition duration-300"
        >
          <i className="bx bx-left-arrow-alt"></i>
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
              currentPage === i + 1
                ? "bg-orange-500 text-white font-bold"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 transition duration-300"
        >
          <i className="bx bx-right-arrow-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default BlogSection;
