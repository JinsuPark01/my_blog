import Image from "next/image";
import Link from "next/link";
import { mockBlogPosts } from "@/data/mockData";

export default function HomePage() {
  // 최신 포스트 3개 추출
  const latestPosts = mockBlogPosts.slice(0, 3);

  // 카테고리별 포스트 개수 계산
  const categories = mockBlogPosts.reduce((acc, post) => {
    const categoryName = post.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-12">
      {/* Hero 섹션 */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
        <p className="text-lg mb-6">웹 개발 학습자를 위한 최고의 리소스</p>
        <Link href="/posts">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
            블로그 보러가기
          </button>
        </Link>
      </section>

      {/* 최신 포스트 섹션 */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">최신 포스트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow-md">
              <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                <p className="text-xs text-gray-500">작성일: {post.publishedAt}</p>
                <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  자세히 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([categoryName, count]) => (
            <Link
              key={categoryName}
              href={`/categories/${categoryName}`}
              className="block border rounded-lg p-4 shadow-md hover:bg-gray-100"
            >
              <h3 className="text-lg font-bold">{categoryName}</h3>
              <p className="text-sm text-gray-600">포스트 개수: {count}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
