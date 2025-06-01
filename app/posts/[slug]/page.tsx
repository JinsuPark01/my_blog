import { notFound } from 'next/navigation';
import { mockBlogPosts, BlogPost } from '../../../data/mockData';
import LikeButton from '../../../components/blog/like-button';
import CommentSection from '../../../components/blog/comment-section';

export async function generateStaticParams() {
  return mockBlogPosts.map((post: BlogPost) => ({ slug: post.slug }));
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = mockBlogPosts.find((p: BlogPost) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Post Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <p className="text-sm text-gray-600">
            Published: {new Date(post.publishedAt).toLocaleDateString()} | Updated: {new Date(post.updatedAt).toLocaleDateString()} | Reading Time: {post.readingTime} min
          </p>
        </div>
        <div className="flex gap-2">
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">{post.category.name}</span>
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-200 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>

        {/* Like Button */}
        <div className="mt-6">
          <LikeButton postId={post.id} />
        </div>
      </header>

      {/* Post Content Section */}
      <section className="mb-8">
        {post.coverImage && <img src={post.coverImage} alt={post.title} className="w-full mb-4" />}
        <article className="prose max-w-none">
          {post.content}
        </article>
      </section>

      {/* Additional Features Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBlogPosts.filter((p) => p.category.id === post.category.id && p.id !== post.id).map((relatedPost) => (
            <div key={relatedPost.id} className="border rounded p-4">
              <h3 className="text-lg font-medium mb-2">{relatedPost.title}</h3>
              <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
              <a href={`/posts/${relatedPost.slug}`} className="text-blue-500 hover:underline">Read More</a>
            </div>
          ))}
        </div>
      </section>

      {/* Comment Section */}
      <section className="mb-8">
        <CommentSection postId={post.id} />
      </section>
    </div>
  );
}
