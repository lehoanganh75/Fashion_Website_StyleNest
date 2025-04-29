import React from 'react';
import HomeSlider from '../Components/HomeSlider';
import CatSlider from '../Components/CardSlider';
import ProductShowCase from '../Components/ProductShowCase';
import FooterSlider from '../Components/FooterSlider';
import FeaturesSection from '../Components/FeaturesSection';
import FromTheBlog from '../Components/FromTheBlog'
import Banner from '../Components/Banner'
const Home = () => {
  return (
    <div className="p-6">
      <HomeSlider />
      <CatSlider />
      <ProductShowCase />
      <Banner />
      <FromTheBlog />
      <FooterSlider />
      <FeaturesSection />
    </div>
  );
};

export default Home;
