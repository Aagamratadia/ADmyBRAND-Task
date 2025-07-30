import { getSortedPostsData } from "../../lib/posts";
import BlogIndexClient from "./BlogIndexClient";

export default function BlogIndexPage() {
  const posts = getSortedPostsData();
  return <BlogIndexClient posts={posts} />;
}
