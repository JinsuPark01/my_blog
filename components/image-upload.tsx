"use client";

import React, { useState } from "react";
import { useSupabaseClient } from "@/lib/supabase";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  initialImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  initialImage,
  className,
}) => {
  const supabase = useSupabaseClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("파일을 선택하세요.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uniqueFileName = `${Date.now()}-${selectedFile.name}`;
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(uniqueFileName, selectedFile);

      if (error) {
        setError(`업로드 실패: ${error.message}`);
        setUploading(false);
        return;
      }

      const { publicUrl } = supabase.storage.from("blog-images").getPublicUrl(uniqueFileName).data;
      onImageUploaded(publicUrl);
      setUploading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(errorMessage);
      setUploading(false);
    }
  };

  return (
    <div className={`image-upload ${className}`}>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <Upload className="mr-2" /> 파일 선택
        </label>
      </div>

      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="미리보기" className="max-w-full h-auto" />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="btn btn-primary"
      >
        {uploading ? "업로드 중..." : "업로드"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImageUpload;
