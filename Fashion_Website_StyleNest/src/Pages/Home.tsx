import React from 'react';
import HomeSlider from '../Components/HomeSlider';
import CatSlider from '../Components/CatSlider';
import ProductShowCase from '../Components/ProductShowCase';
import FooterSlider from '../Components/FooterSlider';
import FeaturesSection from '../Components/FeaturesSection';
const Home = () => {
  return (
    <div className="p-6">
      <HomeSlider />
      <CatSlider />
      <ProductShowCase />
      <FooterSlider />
      <FeaturesSection />
    </div>
  );
};

export default Home;
