"use client";

import { useSupabaseClient } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

// TypeScript 타입 정의
interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * useUploadImage: Supabase Storage에 이미지를 업로드하는 클라이언트 전용 React Hook
 */
export function useUploadImage() {
  const supabase = useSupabaseClient();

  const upload = async (file: File): Promise<UploadResult> => {
    try {
      // 파일 형식 검증
      const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedFormats.includes(file.type)) {
        return { success: false, error: "허용되지 않는 파일 형식입니다. (jpg, png, gif, webp만 가능)" };
      }

      // 고유한 파일명 생성
      const uniqueFileName = `${Date.now()}-${uuidv4()}.${file.name.split(".").pop()}`;

      // Supabase Storage에 파일 업로드
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(uniqueFileName, file);

      if (error) {
        return { success: false, error: `파일 업로드 실패: ${error.message}` };
      }

      // 공개 URL 생성
      const { publicUrl } = supabase.storage.from("blog-images").getPublicUrl(uniqueFileName).data;

      return { success: true, url: publicUrl };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      return { success: false, error: errorMessage };
    }
  };

  return { upload };
}
