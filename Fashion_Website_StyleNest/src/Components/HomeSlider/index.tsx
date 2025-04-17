import React, { useRef, useEffect } from "react";
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
    <div className="flex">
      <div className="col-1 w-[80%]">
        <div className="relative w-full h-[400px] bg-gray-100 p-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            // navigation={true}
            onAutoplayTimeLeft={(s, time, progress) => {
              if (progressCircle.current) {
                progressCircle.current.style.setProperty(
                  "--progress",
                  1 - progress
                );
              }
              if (progressContent.current) {
                progressContent.current.textContent = `${Math.ceil(
                  time / 1000
                )}s`;
              }
            }}
            className="w-full h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))}

            {/* Autoplay progress indicator */}
            <div className="autoplay-progress absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center font-bold text-blue-500 z-10">
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
                  style={{
                    strokeDashoffset: "calc(125.6 * (1 - var(--progress)))",
                  }}
                />
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </div>
      <div className="col_2 w-[20%] h-[400px]">
  <div className="h-full flex flex-col justify-between gap-4">
    {/* Thẻ quảng cáo Samsung - giữ nguyên kích thước */}
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 flex flex-col flex-1 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">Áo PoLo Nam Chất Liệu Linen</h3>
          <div className="flex items-center">
            <p className="text-xl font-bold text-indigo-600">$129.00</p>
            <span className="ml-1 text-xs line-through text-gray-400">$159.00</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded transition-colors duration-200">
            SHOP NOW
          </button>
          <img
            src="/imgs/aopolonamchatlieulinen1.jpg"
            alt="Samsung VR Camera"
            className="w-20 h-20 object-contain transform hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>

    {/* Thẻ quảng cáo Ghế ăn - giữ nguyên kích thước */}
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 flex flex-col flex-1 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">Áo Thun Nam CoLo</h3>
          <div className="flex items-center">
            <p className="text-xl font-bold text-teal-600">$129.00</p>
            <span className="ml-1 text-xs line-through text-gray-400">$149.00</span>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <button className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded transition-colors duration-200">
            SHOP NOW
          </button>
          <img
            src="/imgs/aothunnamcolo1.jpg"
            alt="Marcel Dining Chair"
            className="w-20 h-20 object-contain transform hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default HomeSlider;
