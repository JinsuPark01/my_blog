import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { mockBlogPosts, BlogPost } from '../../data/mockData';
import PostCard from '../../components/blog/post-card';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      const results = mockBlogPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {query && <p className="text-gray-600">Results for "{query}"</p>}
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      ) : query ? (
        <p className="text-gray-600">No results found for "{query}". Try another search term.</p>
      ) : (
        <p className="text-gray-600">Enter a search term to find posts.</p>
      )}
    </div>
  );
};

export default SearchPage;
