"use client";
import PostCard from "../../components/ui/PostCard";
import AnimatedNavbar from "../../components/ui/AnimatedNavbar";
import BlogSectionMotion from "../../components/ui/BlogSectionMotion";
import DarkVeil from "../../components/DarkVeil";
import type { PostData } from "../../lib/posts";

export default function BlogIndexClient({ posts }: { posts: PostData[] }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>
      <AnimatedNavbar />
      <section className="py-24 px-4 lg:px-0 max-w-7xl mx-auto">
        <BlogSectionMotion>
          <h1 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent pt-7">
            All Blog Posts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </BlogSectionMotion>
      </section>
    </div>
  );
}
