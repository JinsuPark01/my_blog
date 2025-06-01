"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { mockBlogPosts, BlogPost } from "../../data/mockData";

const SearchDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(() => {
      const results = mockBlogPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

      setSearchResults(results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Search</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search Posts</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="포스트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          {loading ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((post) => (
                <li key={post.id} className="mb-2">
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-blue-500 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    <strong>{post.title}</strong>
                    <p className="text-sm text-gray-600">{post.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchDialog;
