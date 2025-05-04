import React from 'react';
import HomeSlider from '../components/HomeSlider/HomeSlider';
import ProductSlider from '../components/ProductSlider/ProductSlider';
import ProductGridHome from "../components/ProductGird/ProductGridHome";
import InstagramFeedSwiper from '../components/FooterSlider/InstagramFeedSwiper';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import Blog from '../components/FromTheBlog/Blog';
import Banner from '../components/Banner/Banner';
import { useData } from '../contexts/DataContext';

const HomePage = () => {
  const { products, banners, blogs, instagramPosts, features } = useData();

  return (
    <div className="px-10 py-6 bg-[rgba(244,244,244,255)]">
      <HomeSlider />
      <ProductSlider products={products} />
      <ProductGridHome products={products} />
      <Banner banners={banners}/>
      <Blog blogs={blogs}/>
      <InstagramFeedSwiper instagramPosts={instagramPosts} />
      <FeaturesSection features={features}/>
    </div>
  );
}

export default HomePage

