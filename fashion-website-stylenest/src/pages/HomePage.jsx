import React from 'react';
import HomeSlider from '../components/HomeSlider/HomeSlider';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import ProductGridHome from "../components/ProductGird/ProductGridHome";
import FooterSlider from '../components/FooterSlider/InstagramFeedSwiper';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import Blog from '../components/FromTheBlog/Blog';
import Banner from '../components/Banner/Banner';

const HomePage = () => {
  return (
    <div className="px-10 py-6 bg-[rgba(244,244,244,255)]">
      <HomeSlider />
      <ProductSlider />
      <ProductGridHome />
      <Banner />
      <Blog />
      <FooterSlider />
      <FeaturesSection />
    </div>
  );
}

export default HomePage

