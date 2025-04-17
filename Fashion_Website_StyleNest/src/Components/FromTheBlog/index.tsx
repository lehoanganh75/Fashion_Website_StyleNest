import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import blogPosts from "../../data/fromTheBlog.json";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

export default function Blog() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gray-900 text-center tracking-tight">
        Bài Viết Nổi Bật
      </h2>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="w-full"
      >
        {blogPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-[28rem] max-h-[28rem] transform hover:-translate-y-1 transition-transform duration-300">
              <div className="relative group overflow-hidden">
                <a href={post.link} className="block">
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </a>
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  <a href={post.categoryLink}>{post.category}</a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow min-h-[12rem]">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    {post.day} {post.month}, {post.year}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 hover:text-amber-600 transition-colors duration-300">
                    <a href={post.link}>{post.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                    {post.shortInfo}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <a
                    href={post.link}
                    className="inline-block text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-5 py-2.5 rounded-full uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
                  >
                    Đọc Thêm
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #f59e0b;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}