import React from 'react';

const Banner = () => {
  return (
    <div id="czbannercmsblock1" className="block czbanners bg-gray-50 py-12">
      <div className="czbanner_container container mx-auto px-6">
        <div className="cmsbanners flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 cmsbanner-part1 px-4 mb-8 md:mb-0">
            <div className="cmsbanner-inner relative overflow-hidden rounded-xl shadow-lg group">
              <a href="#" className="banner-anchor block">
                <div className="relative">
                  <img
                    src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-4.jpg"
                    alt="Sofa Ba Chỗ Santa Lucia"
                    className="banner-image1 w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    width={685}
                    height={260}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                </div>
              </a>
              <div className="cmsbanner-text absolute top-4 sm:top-6 left-4 sm:left-6 text-left transform transition-all duration-300 group-hover:-translate-y-2">
                <div className="offer-title text-gray-200 text-sm sm:text-lg font-medium uppercase tracking-wider">Tiết Kiệm Lên Đến 20%</div>
                <div className="main-title text-white text-xl sm:text-3xl font-extrabold leading-tight">
                  Sofa Ba Chỗ <span className="block">Santa Lucia</span>
                </div>
                <div className="view_more mt-2 sm:mt-3">
                  <a
                    href="#"
                    className="btn bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-full uppercase tracking-wide transition-colors duration-300 text-sm sm:text-base"
                  >
                    MUA NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 cmsbanner-part2 px-4">
            <div className="cmsbanner-inner relative overflow-hidden rounded-xl shadow-lg group">
              <a href="#" className="banner-anchor block">
                <div className="relative">
                  <img
                    src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-5.jpg"
                    alt="Áo Thun Cổ Tròn Đỏ Nữ"
                    className="banner-image2 w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    width={685}
                    height={260}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                </div>
              </a>
              <div className="cmsbanner-text absolute top-4 sm:top-6 left-4 sm:left-6 text-left transform transition-all duration-300 group-hover:-translate-y-2">
                <div className="offer-title text-gray-200 text-sm sm:text-lg font-medium uppercase tracking-wider">Giảm Giá Trực Tuyến Tốt Nhất</div>
                <div className="main-title text-white text-xl sm:text-3xl font-extrabold leading-tight">
                  Áo Thun Cổ Tròn <span className="block">Đỏ Nữ</span>
                </div>
                <div className="view_more mt-2 sm:mt-3">
                  <a
                    href="#"
                    className="btn bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-full uppercase tracking-wide transition-colors duration-300 text-sm sm:text-base"
                  >
                    MUA NGAY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;