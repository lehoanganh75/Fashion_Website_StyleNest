import React from "react";
import {
  TruckIcon,
  RefreshCcwIcon,
  WalletIcon,
  GiftIcon,
  HeadphonesIcon,
} from "lucide-react";
import featuresData from "../../data/features.json";

// Define TypeScript interface for feature data
interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Map icon strings to actual Lucide React components
const iconMap: { [key: string]: React.ReactNode } = {
  TruckIcon: <TruckIcon className="h-10 w-10 text-amber-500" />,
  RefreshCcwIcon: <RefreshCcwIcon className="h-10 w-10 text-amber-500" />,
  WalletIcon: <WalletIcon className="h-10 w-10 text-amber-500" />,
  GiftIcon: <GiftIcon className="h-10 w-10 text-amber-500" />,
  HeadphonesIcon: <HeadphonesIcon className="h-10 w-10 text-amber-500" />,
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {featuresData.map((feature: Feature) => (
            <div
              key={feature.id}
              className="relative flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-xl hover:border-amber-200 group min-h-[14rem]"
            >
              <div className="mb-4 transition-transform duration-300 transform group-hover:scale-110">
                {iconMap[feature.icon] || <span className="text-red-500">Icon Not Found</span>}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-300 relative">
                {feature.title}
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-10 h-0.5 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed min-h-[2.5rem] line-clamp-2">
                {feature.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;