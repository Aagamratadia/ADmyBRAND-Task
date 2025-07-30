import React from "react";
import { getSortedPostsData, PostData } from "../../lib/posts";
import PostCard from "../ui/PostCard";
import BlogSectionMotion from "../ui/BlogSectionMotion";

// Server Component: fetches blog data at build time
const BlogSection = async () => {
  const posts = getSortedPostsData().slice(0, 3);

  return (
    <section className="py-24 px-4 lg:px-0 max-w-7xl mx-auto">
      <BlogSectionMotion>
        <h2 className="text-4xl lg:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent">
          From the Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: PostData) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </BlogSectionMotion>
    </section>
  );
};

export default BlogSection;
