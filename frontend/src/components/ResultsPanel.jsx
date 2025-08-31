import React, { useState } from 'react';
import Spinner from './Spinner';
import ProductCard from './ProductCard';

const ResultsPanel = ({ isLoading, error, results, filteredResults, handleUrlSearch }) => {
  const [url, setUrl] = useState('');

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (url) {
      handleUrlSearch(url);
    }
  };

  return (
    <div className="lg:col-span-2">
      <form onSubmit={handleUrlSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Or paste an image URL here"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!url || isLoading}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 transition-colors"
        >
          Find
        </button>
      </form>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[400px]">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Similar Products Found ({isLoading ? '...' : filteredResults.length})
        </h2>
        {isLoading && <div className="flex justify-center pt-20"><Spinner /></div>}
        {error && <p className="text-center pt-20 text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}
        {!isLoading && !error && results.length > 0 && filteredResults.length === 0 && (
          <div className="text-center pt-20 text-gray-600">No products match the current filter. Try lowering the threshold.</div>
        )}
         {!isLoading && !error && results.length === 0 && (
          <div className="text-center pt-20 text-gray-500">Upload an image or paste a URL to start.</div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredResults.map((result) => (
            <ProductCard key={result.product.id} product={result.product} similarity={result.similarity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;