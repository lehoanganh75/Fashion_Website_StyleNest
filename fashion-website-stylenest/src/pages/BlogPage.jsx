import BlogSection from "../components/FromTheBlog/BlogSection";
import NewProducts from "../components/FromTheBlog/NewProducts";
import BlogCategories from "../components/FromTheBlog/BlogCategories";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const BlogPage = () => {
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Blog", href: "#" }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <main className="container mx-auto px-10 py-6 bg-white font-['Roboto']">
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
    </div>
  );
};

export default BlogPage;
