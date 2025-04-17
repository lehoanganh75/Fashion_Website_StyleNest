import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductItem from '../ProductItem';

const AdsBannerSlider = (props) => {
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

        <SwiperSlide>
          <ProductItem />
        </SwiperSlide>
        
        </Swiper>  
    </>
  )
}

export default AdsBannerSlider
