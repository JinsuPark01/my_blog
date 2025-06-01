"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@/lib/supabase";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";

interface PostFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    slug: string;
    coverImageUrl?: string;
    categoryId?: string;
  }) => void;
  initialData?: {
    title?: string;
    content?: string;
    coverImageUrl?: string;
    categoryId?: string;
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣\s\-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData }) => {
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [content, setContent] = useState<string>(initialData?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState<string>(initialData?.coverImageUrl || "");
  const [categoryId, setCategoryId] = useState<string>(initialData?.categoryId || "none");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title || !content) {
      setError("제목과 내용을 입력하세요.");
      return;
    }

    const slug = generateSlug(title);
    const category = categoryId === "none" ? undefined : categoryId;

    onSubmit({ title, content, slug, coverImageUrl, categoryId: category });
  };

  return (
    <div className="post-form">
      <div className="mb-4">
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <ImageUpload
          onImageUploaded={(url) => setCoverImageUrl(url)}
          initialImage={coverImageUrl}
        />
      </div>

      <div className="mb-4">
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectContent>
            <SelectItem value="none">카테고리 없음</SelectItem>
            <SelectItem value="1">카테고리 1</SelectItem>
            <SelectItem value="2">카테고리 2</SelectItem>
            {/* Add more categories dynamically if needed */}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <Textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setError(null)}>
          취소
        </Button>
        <Button variant="default" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
};

export default PostForm;