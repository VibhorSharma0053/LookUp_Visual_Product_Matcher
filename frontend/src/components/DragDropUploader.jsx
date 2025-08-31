import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const DragDropUploader = ({ onFileSelect, isUploading }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag} 
      onDragLeave={handleDrag} 
      onDragOver={handleDrag} 
      onDrop={handleDrop} 
      className={`relative w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${isDragging ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-white'}`}
      onClick={() => document.getElementById('fileInput').click()}
    >
      <input type="file" id="fileInput" className="hidden" onChange={handleChange} accept="image/png, image/jpeg" disabled={isUploading} />
      <div className="flex flex-col items-center justify-center text-gray-500">
        <UploadCloud size={48} className="mb-4 text-gray-400" />
        <p className="font-semibold">Drag & Drop Image Here</p>
        <p className="text-sm">or Click to Upload</p>
      </div>
    </div>
  );
};

export default DragDropUploader;