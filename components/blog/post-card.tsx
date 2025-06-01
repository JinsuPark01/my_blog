import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/mockData";
import LikeButton from "./like-button";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/posts/${post.slug}`}
        className="block"
      >
        {/* 커버 이미지 */}
        <div className="relative w-full h-48">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지 없음</span>
            </div>
          )}
        </div>
      </Link>

      {/* 포스트 정보 */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* 하단 정보 */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>작성일: {new Date(post.publishedAt).toLocaleDateString("ko-KR")}</p>
          <p>읽기 시간: {post.readingTime}분</p>
          <div className="flex space-x-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/categories/${tag}`}
                className="text-blue-600 hover:underline"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* 좋아요 버튼 */}
        <div className="mt-4">
          <LikeButton postId={post.id} />
        </div>
      </div>
    </div>
  );
}
