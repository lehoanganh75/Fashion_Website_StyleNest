import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomeSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const images = [
    "./imgs/slider1.png",
    "./imgs/slider2.png",
    "./imgs/slider3.png",
    "./imgs/slider4.png",
    "./imgs/slider5.png",
    "./imgs/slider6.png",
    "./imgs/slider7.png",
  ];

  return (
    <div className="flex gap-4">
      {/* Left Column - Swiper Slider */}
      <div className="w-[80%]">
        <div className="relative w-full h-[400px] bg-white shadow-md rounded-xl overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            onAutoplayTimeLeft={(s, time, progress) => {
              if (progressCircle.current) {
                progressCircle.current.style.setProperty(
                  "--progress",
                  1 - progress
                );
              }
              if (progressContent.current) {
                progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
              }
            }}
            className="w-full h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}

            {/* Autoplay progress indicator */}
            <div className="autoplay-progress absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center font-semibold text-blue-600 z-10">
              <svg
                viewBox="0 0 48 48"
                ref={progressCircle}
                className="absolute w-full h-full rotate-[-90deg]"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-blue-500 fill-none"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="calc(125.6 * (1 - var(--progress)))"
                />
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </div>

      {/* Right Column - Ads Section */}
      <div className="w-[20%] h-[400px] flex flex-col justify-between gap-4">
        {/* Ad 1: Polo Shirt */}
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition-all duration-300 border border-gray-200">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-800 leading-snug">
              Áo PoLo Nam Chất Liệu Linen
            </h3>
            <div className="flex items-center space-x-1">
              <p className="text-lg font-bold text-indigo-600">$129.00</p>
              <span className="text-xs line-through text-gray-400">$159.00</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <button className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors duration-200">
              Mua ngay
            </button>
            <img
              src="/imgs/aopolonamchatlieulinen1.jpg"
              alt="Áo PoLo"
              className="w-20 h-20 object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Ad 2: T-Shirt */}
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-4 flex flex-col justify-between shadow hover:shadow-lg transition-all duration-300 border border-gray-200">
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-800 leading-snug">
              Áo Thun Nam CoLo
            </h3>
            <div className="flex items-center space-x-1">
              <p className="text-lg font-bold text-teal-600">$129.00</p>
              <span className="text-xs line-through text-gray-400">$149.00</span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <button className="px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-md transition-colors duration-200">
              Mua ngay
            </button>
            <img
              src="/imgs/aothunnamcolo1.jpg"
              alt="Áo Thun"
              className="w-20 h-20 object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
