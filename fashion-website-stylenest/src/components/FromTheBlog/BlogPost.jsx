import { Link, useParams } from "react-router-dom";
import blogData from "../../data/fromTheBlog.json";

const BlogPost = () => {
  const { id } = useParams();

  const post = blogData.find((item) => item.id === Number(id));

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Bài viết không tồn tại</h2>
        <Link to="/blog" className="text-red-500 underline mt-4 inline-block">
          Quay lại danh sách bài viết
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/blog" className="text-red-500 hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại Blog
          </Link>
        </div>

        <article className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="relative h-80 w-full">
            <img
              src={post.imageSrc || "/placeholder.svg"}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                <a href={post.categoryLink} className="hover:underline">{post.category}</a>
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed">{post.shortInfo}</p>
            <p className="text-gray-600 mt-6">{post.description}</p> {/* Display full description */}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost
