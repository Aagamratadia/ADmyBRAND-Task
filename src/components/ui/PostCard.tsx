import React from "react";
import Link from "next/link";
import type { PostData } from "../../lib/posts";
import { motion } from "framer-motion";

interface PostCardProps {
  post: PostData;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:scale-[1.03] transition-transform duration-300 flex flex-col ring-1 ring-primary/20"
    >
      <Link href={`/blog/${post.slug}`} className="flex-1 flex flex-col h-full group">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 bg-neutral-900"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = '/fallback-image.png'; }}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="text-xs text-zinc-400 mb-2">
            {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white line-clamp-2 drop-shadow-lg">
            {post.title}
          </h3>
          <p className="text-base text-zinc-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-auto text-sm text-primary font-semibold">
            Read more &rarr;
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
