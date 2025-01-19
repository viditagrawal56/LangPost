import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Upload } from "lucide-react";

interface HeroSectionProps {
  onFileUpload: (files: File[]) => void;
  isUploading?: boolean;
  uploadStatus?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onFileUpload,
  isUploading = false,
  uploadStatus = "",
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Tilted grid background */}
      <div className="absolute inset-0 bg-grid-pattern transform -skew-y-6 opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          AI-Powered Translation
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Experience seamless language translation with cutting-edge AI
          technology
        </p>

        <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
            <Input
              type="text"
              placeholder="Enter text to translate"
              className="flex-grow mr-4 bg-gray-800 text-white border-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <select className="appearance-none bg-gray-800 text-white px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Drag and drop area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-500 bg-opacity-10"
                : "border-gray-600 hover:border-gray-500"
            }`}
          >
            <input {...getInputProps()} disabled={isUploading} />
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            {isDragActive ? (
              <p className="text-blue-500">Drop the files here ...</p>
            ) : (
              <p className="text-gray-400">
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div
              className={`mb-4 text-center ${
                uploadStatus.includes("failed")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {uploadStatus}
            </div>
          )}

          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="text-white mb-2">Selected Files:</h3>
              <ul className="list-disc list-inside text-gray-400">
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={isUploading || files.length === 0}
          >
            {isUploading ? "Uploading..." : "Translate Now"}
          </Button>
        </div>
      </div>

      {/* Glowing accents */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
    </div>
  );
};

export default HeroSection;
