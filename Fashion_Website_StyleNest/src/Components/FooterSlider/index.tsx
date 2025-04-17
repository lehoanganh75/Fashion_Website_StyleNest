import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import instagramPosts from "../../data/instagramPosts.json";

// Define TypeScript interface for Instagram post data
interface InstagramPost {
  id: number;
  imageUrl: string;
  alt: string;
}

const InstagramFeedSwiper: React.FC = () => {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Follow Us On Instagram
        </h2>

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
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          {instagramPosts.map((post: InstagramPost) => (
            <SwiperSlide key={post.id}>
              <a href="#" className="block overflow-hidden group rounded-lg">
                <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                  <img
                    src={post.imageUrl}
                    alt={post.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      console.error(`Failed to load image: ${post.imageUrl}`);
                      e.currentTarget.style.backgroundColor = "gray";
                      e.currentTarget.style.opacity = "0.5";
                      e.currentTarget.alt = "Image failed to load";
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