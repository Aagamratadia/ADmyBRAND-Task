import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontMatter {
  title: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
}

export interface PostData extends PostFrontMatter {
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      content,
      ...(data as PostFrontMatter),
    };
  });
  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    content,
    ...(data as PostFrontMatter),
  };
}
