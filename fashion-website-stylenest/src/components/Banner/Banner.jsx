import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ banners }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Chỉ thực hiện khi banners có dữ liệu
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setStartIndex((prevIndex) => (prevIndex + 2) % banners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Kiểm tra nếu banners có dữ liệu
  if (!banners || banners.length === 0) {
    return null; // Hoặc có thể hiển thị một phần tử nào đó nếu cần
  }

  const visibleBanners = [
    banners[startIndex],
    banners[(startIndex + 1) % banners.length],
  ];

  return (
    <section className="font-sans py-10 transition-all duration-700">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleBanners.map((banner, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl shadow-lg group transition-opacity duration-1000"
            >
              <Link to="#" className="block">
                <img
                  src={banner.img}
                  alt={banner.alt}
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition duration-500 ease-in-out group-hover:opacity-90"></div>
              </Link>
              <div className="absolute top-6 left-6 sm:top-10 sm:left-10 text-white z-10 transition-all duration-300 group-hover:-translate-y-1.5">
                <p className="uppercase text-sm sm:text-base text-amber-300 font-medium tracking-wider mb-1">
                  {banner.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight drop-shadow-lg">
                  {banner.title} <span className="block">{banner.subtitle}</span>
                </h3>
                <div className="mt-4">
                  <Link
                    to="/product/fashion"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base px-4 py-3 rounded-lg tracking-wide transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
