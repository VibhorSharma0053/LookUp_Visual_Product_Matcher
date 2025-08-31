import React from 'react';
import { X } from 'lucide-react';
import DragDropUploader from './DragDropUploader';

const Controls = ({ 
  queryImage, 
  isLoading, 
  handleFileSelect, 
  resetState, 
  similarityThreshold, 
  setSimilarityThreshold 
}) => {
  return (
    <div className="lg:col-span-1 space-y-8">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Image</h2>
        {!queryImage && <DragDropUploader onFileSelect={handleFileSelect} isUploading={isLoading} />}
        {queryImage && (
          <div className="relative group w-48 h-48 mx-auto">
              <img src={queryImage} alt="Query" className="rounded-full w-full h-full object-cover border-4 border-white shadow-lg" />
              <button onClick={resetState} className="absolute top-2 right-2 bg-white rounded-full p-1.5 text-gray-600 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <X size={18} />
              </button>
          </div>
        )}
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label htmlFor="similarity" className="block text-lg font-semibold mb-4 text-gray-700">
          Minimum Similarity
        </label>
        <div className="flex items-center gap-4">
           <input
              type="range"
              id="similarity"
              min="0"
              max="1"
              step="0.01"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb"
           />
           <span className="font-bold text-teal-600 text-lg w-16 text-center">
              {(similarityThreshold * 100).toFixed(0)}%
           </span>
        </div>
      </div>
    </div>
  );
};

export default Controls;