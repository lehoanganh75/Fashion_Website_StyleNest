import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

const InstagramFeedSwiper = ({ instagramPosts }) => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4 leading-tight">
          Theo dõi chúng tôi trên Instagram
        </h2>
        <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full mb-10"></div>

        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={instagramPosts.length > 2}  // Chỉ bật loop khi có đủ ít nhất 3 slide
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper"
        >
          {instagramPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <a
                href="#"
                className="block overflow-hidden group rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                  <img
                    src={post.imageUrl}
                    alt={post.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/fallback.jpg";
                      e.currentTarget.style.opacity = "0.6";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 5.65a7.5 7.5 0 010 10.6z"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InstagramFeedSwiper;
