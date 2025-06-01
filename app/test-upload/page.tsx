"use client";

import React, { useState } from "react";
import { useUploadImage } from "../../lib/upload-image-client";
import { useSession } from "@clerk/nextjs";

const TestUploadPage: React.FC = () => {
  const { session } = useSession();

  if (!session) {
    return <div className="p-4">로그인이 필요합니다.</div>;
  }

  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const uploadImage = useUploadImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadResult("No file selected");
      return;
    }

    try {
      const result = await uploadImage.upload(file);
      setUploadResult(`Upload successful: ${result.url}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setUploadResult(`Upload failed: ${errorMessage}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Image Upload</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Image
      </button>
      {uploadResult && <p className="mt-4">{uploadResult}</p>}
    </div>
  );
};

export default TestUploadPage;