import Link from "next/link";
import { mockBlogPosts } from "@/data/mockData";

export const metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function CategoriesPage() {
  // 카테고리별 포스트 개수 계산
  const categories = mockBlogPosts.reduce((acc, post) => {
    const categoryName = post.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">카테고리 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([categoryName, count]) => (
          <Link
            key={categoryName}
            href={`/categories/${categoryName}`}
            className="block border rounded-lg p-4 shadow-md hover:bg-gray-100"
          >
            <h2 className="text-lg font-bold">{categoryName}</h2>
            <p className="text-sm text-gray-600">포스트 개수: {count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
