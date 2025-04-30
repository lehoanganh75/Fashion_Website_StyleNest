import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import blogPosts from "../../data/fromTheBlog.json";
import { Link } from "react-router-dom";
import "./Blog.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Blog = () => {
  return (
    <section className="py-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400 mb-4 leading-[1.3]">
        Bài viết nổi bật
      </h2>
      <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-10"></div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
      >
        {blogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-[28rem]">
              <div className="relative group">
                <Link to={`/blog/${post.id}`} className="block">
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-56 object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </Link>
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  <Link to={post.categoryLink}>{post.category}</Link>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-2">
                  {post.day} {post.month}, {post.year}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors duration-300">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {post.shortInfo}
                </p>

                <div className="mt-auto pt-4">
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-block bg-amber-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg uppercase tracking-wide hover:bg-amber-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Đọc Thêm
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Blog;
