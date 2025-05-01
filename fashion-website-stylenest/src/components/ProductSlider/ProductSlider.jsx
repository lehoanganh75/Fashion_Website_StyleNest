import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import data from "../../data/data.json"
import { Link } from "react-router-dom"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default function ProductSlider() {
  const [slidesPerView, setSlidesPerView] = useState(5)
  const [products, setProducts] = useState([])

  // Update slides per view based on screen size
  useEffect(() => {
    // Shuffle and slice 20 products
    const shuffled = [...data].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 20)
    setProducts(selected)
  
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
  
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="item h-[320px] p-4 pt-6 bg-white rounded-lg shadow-xl text-center flex flex-col items-center justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg"> {/* Increased height here */}
                  <img
                    src={product.thumbnails[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
