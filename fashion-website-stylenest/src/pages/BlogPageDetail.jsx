import React from "react";
import BlogPost from "../Components/FromTheBlog/BlogPost";
import NewProducts from "../Components/FromTheBlog/NewProducts";
import BlogCategories from "../Components/FromTheBlog/BlogCategories";

const BlogDetail = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <BlogPost />
        </div>
        <div className="md:col-span-1">
          <NewProducts />
          <BlogCategories />
        </div>
      </div>
    </main>
  );
};

export default BlogDetail;
