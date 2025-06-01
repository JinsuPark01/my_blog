"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockBlogPosts, BlogPost, Category } from '../../data/mockData';
import PostCard from '../../components/blog/post-card';
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationLink,
} from '../../components/ui/pagination';

const PostsPage = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const categoryFilter = searchParams.get('category') || '';
  const sortOption = searchParams.get('sort') || 'latest';

  const [searchQuery, setSearchQuery] = useState('');

  const postsPerPage = 9;

  // Filter and sort posts
  let filteredPosts: BlogPost[] = mockBlogPosts;
  if (categoryFilter) {
    filteredPosts = filteredPosts.filter((post: BlogPost) => post.category.name === categoryFilter);
  }

  if (sortOption === 'latest') {
    filteredPosts = filteredPosts.sort((a: BlogPost, b: BlogPost) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (sortOption === 'popular') {
    filteredPosts = filteredPosts.sort((a: BlogPost, b: BlogPost) => b.viewCount - a.viewCount);
  }

  if (searchQuery) {
    filteredPosts = filteredPosts.filter((post: BlogPost) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Pagination logic
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    window.location.search = params.toString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-gray-600">Explore our latest articles and insights.</p>
        <p className="text-gray-600">Total Posts: {totalPosts}</p>
      </header>

      {/* Filter and Sort Section */}
      <section className="mb-8 flex flex-wrap gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={categoryFilter}
            onChange={(e) => {
              const category = e.target.value;
              const params = new URLSearchParams(searchParams);
              if (category) {
                params.set('category', category);
              } else {
                params.delete('category');
              }
              window.location.search = params.toString();
            }}
          >
            <option value="">All Categories</option>
            {mockBlogPosts.map((post: BlogPost) => (
              <option key={post.category.id} value={post.category.name}>{post.category.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort By</label>
          <select
            id="sort"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={sortOption}
            onChange={(e) => {
              const sort = e.target.value;
              const params = new URLSearchParams(searchParams);
              params.set('sort', sort);
              window.location.search = params.toString();
            }}
          >
            <option value="latest">Latest</option>
            <option value="popular">Popular</option>
          </select>
        </div>

        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
          <input
            id="search"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post: BlogPost) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>

      {/* Pagination */}
      <Pagination className="mt-8">
        <PaginationPrevious
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        />
      </Pagination>
    </div>
  );
};

export default PostsPage;
