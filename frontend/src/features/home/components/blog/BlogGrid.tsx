import { blogs } from "./blogs";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  );
}