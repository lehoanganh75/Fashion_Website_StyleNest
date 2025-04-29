import BlogSection from "../Components/FromTheBlog/blog-section"
import NewProducts from "../Components/FromTheBlog/new-products"
import BlogCategories from "../Components/FromTheBlog/blog-categories"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <BlogSection />
        </div>
        <div className="md:col-span-1">
          <NewProducts />
          <BlogCategories />
        </div>
      </div>
    </main>
  )
}
