"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import ImageUpload from "@/components/image-upload";
import { SignedIn, SignedOut } from "@clerk/nextjs";

interface Category {
  id: string;
  name: string;
}

const CreatePostPage = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("none");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    // 목업 데이터
    const mockCategories = [
      { id: "1", name: "Technology" },
      { id: "2", name: "Health" },
      { id: "3", name: "Lifestyle" },
    ];

    // 목업 데이터를 상태로 설정
    setCategories(mockCategories);
  }, []);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!title || !content || slug === "") {
      setError("필수 필드를 모두 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          slug,
          cover_image_url: coverImageUrl,
          category_id: categoryId === "none" ? null : categoryId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "게시물 저장에 실패했습니다.");
      }

      const post = await response.json();
      router.push(`/posts/${post.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">게시물 작성</h1>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setSlug(generateSlug(e.target.value));
            }}
            className="mb-4"
          />

          <ImageUpload
            onImageUploaded={(url: string) => setCoverImageUrl(url)}
            className="mb-4"
          />

          <Select
            value={categoryId}
            onValueChange={(value: string) => setCategoryId(value)}
          >
            <SelectTrigger className="mb-4">카테고리를 선택하세요</SelectTrigger>
            <SelectContent>
              <SelectItem value="none">카테고리 없음</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            className="mb-4"
          />

          <div className="flex justify-end gap-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "저장 중..." : "저장"}
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              취소
            </Button>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다.</h1>
          <Button onClick={() => router.push("/sign-in")}>로그인</Button>
        </div>
      </SignedOut>
    </>
  );
};

export default CreatePostPage;