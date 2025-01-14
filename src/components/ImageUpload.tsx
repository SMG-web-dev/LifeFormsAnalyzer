import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }, []);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onImageSelect(file);
  }, [onImageSelect]);

  return (
    <div className="w-full max-w-3xl mx-auto transition-all duration-300">
      {!preview ? (
        <div
          className={`relative border-3 border-dashed rounded-xl p-12 text-center 
                     transition-all duration-500 transform hover:scale-[1.01]
                     ${dragActive
              ? 'border-forest-400 bg-forest-800/30 scale-[1.02]'
              : 'border-forest-700 hover:border-forest-600'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-forest-800/0 via-forest-800/0 to-forest-400/5 
                        rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

          <input
            type="file"
            className="hidden"
            id="image-upload"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="p-6 rounded-full bg-forest-800/50 group-hover:bg-forest-700/50 
                          transition-all duration-300 hover:shadow-lg hover:shadow-forest-500/10">
              <Upload className="w-12 h-12 text-forest-400 group-hover:text-forest-300 
                               transition-all duration-300 transform group-hover:scale-110" />
            </div>
            <span className="text-xl font-medium text-forest-200 mt-6 group-hover:text-forest-100
                           transition-all duration-300">
              Drop your specimen image here
            </span>
            <span className="text-sm text-forest-400 mt-2 group-hover:text-forest-300
                           transition-all duration-300">
              or click to select a file
            </span>
          </label>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden bg-forest-800/30 p-4 animate-scale-in">
          <div className="relative rounded-lg overflow-hidden shadow-lg 
                        transform transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
            <img src={preview} alt="Preview" className="w-full h-80 object-cover" />
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 p-2 bg-forest-900/90 backdrop-blur-sm rounded-full 
                       shadow-lg hover:bg-forest-800 transition-all duration-300 
                       transform hover:scale-110 hover:rotate-90"
            >
              <X className="w-5 h-5 text-forest-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}