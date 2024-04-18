'use client'

import React, { useState } from 'react';

export const ProductsWindow = ({ categories, products }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || '');

  return (
    <div className="bg-gray-200 p-5">
      <div className="flex max-w-4xl mx-auto bg-white border-2 border-gray-400 shadow-md">
        <div className="w-1/4 border-r-2 border-gray-400">
          <ul className="space-y-2 p-2">
            {categories.map(category => (
              <li key={category.id}
                  className={`p-2 cursor-pointer hover:bg-gray-300 ${selectedCategory === category.name ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 overflow-y-auto" style={{ maxHeight: '300px' }}>
          <div className="p-4 grid grid-cols-2 gap-4">
            {products.filter(product => product.category === selectedCategory).map(product => (
              <div key={product.id} className="border-2 border-gray-400 p-2 shadow">
                <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
                <h3 className="text-center mt-2">{product.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
