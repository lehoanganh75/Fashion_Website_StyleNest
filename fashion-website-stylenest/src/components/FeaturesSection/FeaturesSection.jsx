import React from "react";
import {
  TruckIcon,
  RefreshCcwIcon,
  WalletIcon,
  GiftIcon,
  HeadphonesIcon,
} from "lucide-react";

import featuresData from "../../data/features.json";

// Map icon strings to actual Lucide icon components
const iconMap = {
  TruckIcon,
  RefreshCcwIcon,
  WalletIcon,
  GiftIcon,
  HeadphonesIcon,
};

const FeaturesSection = () => {
  return (
    <section className="w-full py-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Tại sao chọn chúng tôi?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {featuresData.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="relative group bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:border-amber-300 p-6 flex flex-col items-center text-center min-h-[14rem] overflow-hidden"
              >
                {/* Icon Section with glow */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 blur-xl bg-amber-100 opacity-40 rounded-full scale-125 z-0"></div>
                  {Icon ? (
                    <Icon className="h-10 w-10 text-amber-500 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <span className="text-red-500">Icon?</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 mb-1 relative z-10">
                  {feature.title}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mt-1 line-clamp-2 z-10">
                  {feature.description}
                </p>

                {/* Hover background overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
