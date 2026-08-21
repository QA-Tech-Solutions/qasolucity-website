"use client";

import { blogs } from "./blogs-data";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          index={index}
        />
      ))}
    </div>
  );
}