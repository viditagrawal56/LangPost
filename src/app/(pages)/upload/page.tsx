"use client";

import HeroSection from "@/components/HeroSection";
import React, { useState } from "react";

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileUpload = async (files: File[]) => {
    setUploadedFiles(files);
    setIsUploading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setUploadStatus("Upload successful!");
      console.log("Upload response:", data);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <HeroSection
        onFileUpload={handleFileUpload}
        isUploading={isUploading}
        uploadStatus={uploadStatus}
      />
    </div>
  );
};

export default UploadPage;
