"use client";

import React, { useState } from "react";
import HeroSection from "./components/HeroSection/hero-section";

const App: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    // Here you would typically send these files to your backend for processing
    console.log("Files uploaded:", files);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <HeroSection onFileUpload={handleFileUpload} />
    </div>
  );
};

export default App;
