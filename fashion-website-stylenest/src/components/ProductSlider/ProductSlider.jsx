import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function ProductSlider() {
  const [slidesPerView, setSlidesPerView] = useState(5)

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2)
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth < 1280) {
        setSlidesPerView(4)
      } else {
        setSlidesPerView(5)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const products = [
    { id: 1, name: "Áo PoLo Nam Dáng Rộng", image: "/imgs/aopolonamdangrong2.jpg" },
    { id: 2, name: "Áo PoLo Nam Cổ V1", image: "/imgs/aopolonamcov1.jpg" },
    { id: 3, name: "Áo PoLo Nam Dáng Rộng", image: "/imgs/aopolonamdangrong2.jpg" },
    { id: 4, name: "Áo PoLo Nam Kẻ Ngang", image: "/imgs/aopolonamkengang1.jpg" },
    { id: 5, name: "Quần short thể thao dài", image: "/imgs/quanshortthethaodai3.jpg" },
    { id: 6, name: "Áo PoLo Nam SlimFit", image: "/imgs/aopolonamslimfit2.jpg" },
    { id: 7, name: "Áo Thun Jogger Nam", image: "/imgs/aothunjoggernam2.jpg" },
    { id: 8, name: "Áo Thun Khoác Gió Nam", image: "/imgs/aothunkhoacgionam2.jpg" },
    { id: 9, name: "Áo Thun Nam Oxford", image: "/imgs/aothunnamoxford3.jpg" },
  ]

  return (
    <div className="w-full pt-4">
      <style>
        {`
        .swiper-pagination {
          position: relative !important;
          margin-top: 15px !important;
        }
        
        /* Enhanced navigation arrows */
        .swiper-button-next, 
        .swiper-button-prev {
          color: #ffffff !important;
          background: rgba(0, 0, 0, 0.5);
          width: 35px !important;
          height: 35px !important;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover, 
        .swiper-button-prev:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .swiper-button-next:after, 
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold;
        }
        
        /* Position the arrows more prominently */
        .swiper-button-next {
          right: 5px;
        }
        
        .swiper-button-prev {
          left: 5px;
        }
        
        /* Style for pagination bullets */
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #ccc;
          opacity: 0.7;
        }
        
        .swiper-pagination-bullet-active {
          background: #333;
          opacity: 1;
        }
        `}
      </style>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={15}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="item p-4 pt-6 bg-white rounded-lg shadow-xl text-center flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="relative w-full h-[200px] mb-4 overflow-hidden rounded-lg"> {/* Increased height here */}
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 rounded-lg"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
