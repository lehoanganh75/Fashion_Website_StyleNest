import React from 'react';
import { Star } from 'lucide-react';
import "boxicons/css/boxicons.min.css";
import { Link } from 'react-router-dom';

const EcommerceShowcase = () => {
  return (
    <div className="container mx-auto font-['Roboto']">
      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - New Products */}
        <div className="w-full md:w-1/3 space-y-8">
          {/* New Products */}
          <div className="border border-gray-300 rounded-sm overflow-hidden shadow-sm bg-white">
            <div className="border-b border-gray-200 px-6 py-4 bg-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Sản phẩm mới</h2>
            </div>
            <div className="divide-y divide-gray-300">
              {/* Product 1 */}
              <div className="p-5 flex gap-4">
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-0.5 rounded-tr-md">
                    -8%
                  </div>
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Dustpan"
                    className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Plastic Bamboo Dustpan & Brush Set</h3>
                  <div className="flex text-yellow-400 my-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-gray-400">$57.00</span>
                    <span className="text-red-500 font-semibold">$52.44</span>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="p-5 flex gap-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Nike Air Max"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Nike Air Max Invigor 'Black'</h3>
                  <div className="flex text-yellow-400 my-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                    <Star size={16} className="text-gray-300" />
                  </div>
                  <div className="font-semibold text-gray-800">$84.00</div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="p-5 flex gap-4">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Smart Speaker"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">Smart Speaker & Google Assistant</h3>
                  <div className="flex text-yellow-400 my-1">
                    {[1, 2, 3].map((star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                    {[1, 2].map((star) => (
                      <Star key={`gray-${star}`} size={16} className="text-gray-300" />
                    ))}
                  </div>
                  <div className="font-semibold text-gray-800">$54.00</div>
                </div>
              </div>

              {/* View All Link */}
              <div className="p-5">
                <Link
                  to="#"
                  className="text-sm text-gray-600 font-medium hover:underline transition-all"
                >
                  View All New Products <i class='bx bx-right-arrow-alt'></i>
                </Link>
              </div>
            </div>
          </div>

            {/* Blog Categories */}
            <div className="border border-gray-300 rounded-sm bg-white shadow-md overflow-hidden">
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">Danh mục blog</h2>
                </div>

                {/* Body */}
                <div className="px-6 py-5 text-gray-700 text-base space-y-4">
                    <p className="font-medium text-gray-600">Ecommerce Trends</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li className="hover:text-orange-500 transition-colors cursor-pointer">Shopping</li>
                    <li className="hover:text-orange-500 transition-colors cursor-pointer">Digital Payments</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Right Column - Brands */}
        <div className="w-full md:w-2/3 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Thương hiệu</h2>

          {[1, 2, 3, 4].map((brand, i) => {
            const titles = ['Gadget Zone', 'Initech Space', 'Looney Tunes', 'Massive Dynamic'];
            const descriptions = [
              'Established fact that a reader will be distracted by the readable content...',
              'At vero eos et accusamus et iusto odio dignissimos ducimus...',
              'The point of using Lorem Ipsum is that it has a more-or-less normal distribution...',
              'Fashion has been creating well-designed collections since 2010...',
            ];

            return (
                <div key={i} className="border border-gray-300 rounded-sm bg-white shadow-sm p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Logo */}
                  <div className="w-full md:w-1/4 flex justify-center items-center">
                    <div className="border border-gray-300 rounded-sm p-4 w-40 h-28 min-h-[112px] flex items-center justify-center bg-gray-50">
                      <img
                        src="/placeholder.svg?height=60&width=120"
                        alt={titles[i]}
                        className="max-w-full max-h-full"
                      />
                    </div>
                  </div>
              
                  {/* Nội dung thương hiệu */}
                  <div className="w-full md:w-2/4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{titles[i]}</h3>
                    <p className="text-gray-600 text-sm mb-3">{descriptions[i]}</p>
                  </div>
              
                  {/* Nút bấm và số sản phẩm */}
                  <div className="w-full md:w-1/4 flex flex-col justify-around items-center text-center">
                    <div className="text-gray-500 mb-2 text-base">2 products</div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-1 rounded-lg w-8/12 transition-all">
                      Xem sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EcommerceShowcase;
