import React from 'react';

const ProductCard = ({ product, similarity }) => {
  const imageUrl = `http://127.0.0.1:8000/static/${product.image_filename}`;
  const similarityPercentage = (similarity * 100).toFixed(2);
  
  const getBarColor = () => {
    if (similarity > 0.9) return 'bg-green-500';
    if (similarity > 0.8) return 'bg-lime-500';
    if (similarity > 0.7) return 'bg-yellow-500';
    return 'bg-amber-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group transition-all hover:shadow-lg">
      <div className="w-full h-48 overflow-hidden">
        <img src={imageUrl} alt={product.productDisplayName} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-800 truncate" title={product.productDisplayName}>{product.productDisplayName}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.masterCategory}</p>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className={`${getBarColor()} h-1.5 rounded-full`} style={{ width: `${similarityPercentage}%` }}></div>
        </div>
        <p className="text-xs text-right text-gray-600 mt-1">Similarity: {similarityPercentage}%</p>
      </div>
    </div>
  );
};

export default ProductCard;