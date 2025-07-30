import { getPostData, getSortedPostsData, PostData } from "../../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getPostData(params.slug);
  } catch {
    notFound();
  }

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <div className="mb-8">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary via-secondary to-foreground bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="text-muted-foreground text-sm mb-2">
          By {post.author} &middot; {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
        </div>
        <div className="text-base text-muted-foreground mb-6">
          {post.excerpt}
        </div>
      </div>
      <div className="prose prose-invert max-w-none prose-a:text-primary prose-h2:text-secondary">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
