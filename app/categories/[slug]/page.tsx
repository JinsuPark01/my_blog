import { mockBlogPosts } from "@/data/mockData";

export async function generateStaticParams() {
  const categories = mockBlogPosts.map((post) => post.category.name);
  const uniqueCategories = Array.from(new Set(categories));

  return uniqueCategories.map((category) => ({ slug: category }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // 해당 카테고리의 포스트 필터링
  const filteredPosts = mockBlogPosts.filter(
    (post) => post.category.name === slug
  );

  if (filteredPosts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">카테고리: {slug}</h1>
        <p className="text-gray-600">해당 카테고리에 포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">카테고리: {slug}</h1>
      <p className="text-gray-600 mb-6">포스트 개수: {filteredPosts.length}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
              <p className="text-xs text-gray-500">작성일: {post.publishedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
