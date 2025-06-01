"use client";

import React from "react";
import PostForm from "@/components/admin/post-form";
import { useSession } from "@clerk/nextjs";

const NewPostPage: React.FC = () => {
  const { session } = useSession();

  if (!session) {
    return <div className="p-4">로그인이 필요합니다.</div>;
  }

  const handleSubmit = (data: {
    title: string;
    content: string;
    slug: string;
    coverImageUrl?: string;
    categoryId?: string;
  }) => {
    console.log("Submitted post data:", data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">새 게시물 작성</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPostPage;