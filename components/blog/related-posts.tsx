import React from 'react';
import { BlogPost } from '../../data/mockData';
import PostCard from './post-card';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, allPosts }) => {
  // Filter related posts
  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPost.id)
    .filter((post) => post.category.id === currentPost.category.id ||
      post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, 3);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
      {relatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No related posts found. Check out our latest posts!</p>
      )}
    </section>
  );
};

export default RelatedPosts;
