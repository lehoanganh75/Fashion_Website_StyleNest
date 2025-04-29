import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

export default function CatSlider() {
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mt-2"
      >
        <SwiperSlide className='pb-8'>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aopolonamdangrong2.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo PoLo Nam Dáng Rộng</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aopolonamcov1.jpg"
              alt="Áo PoLo Nam Cổ"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo PoLo Nam Cổ V1</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aopolonamdangrong2.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo PoLo Nam Dáng Rộng</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aopolonamkengang1.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo PoLo Nam Kẻ Ngang</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/quanshortthethaodai3.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Quần short thể thao dài</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer' >
            <img    
              src="./imgs/aopolonamslimfit2.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo PoLo Nam SlimFit</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aothunjoggernam2.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo Thun Jogger Nam</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aothunkhoacgionam2.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo Thun Khoác Gió Nam</h3>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='item p-3 bg-white rounded-sm text-center flex flex-col items-center justify-center hover:cursor-pointer'>
            <img
              src="./imgs/aothunnamoxford3.jpg"
              alt="Áo PoLo Nam Dáng Rộng"
              className="h-[150px] object-contain mb-2"
            />
            <h3 className="text-sm font-medium">Áo Thun Nam OxFord</h3>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
