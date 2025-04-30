import React from "react";
import BlogSection from "../Components/FromTheBlog/BlogSection";
import NewProducts from "../Components/FromTheBlog/NewProducts";
import BlogCategories from "../Components/FromTheBlog/BlogCategories";

const BlogPage = () => {
  return (
    <main className="container mx-auto px-6 py-8 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Main content section */}
        <div className="md:col-span-3">
          <BlogSection />
        </div>

        {/* Sidebar section */}
        <div className="md:col-span-1 space-y-8">
          <NewProducts />
          <BlogCategories />
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
