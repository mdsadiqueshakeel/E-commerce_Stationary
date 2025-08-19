import React from 'react';
import { Search } from 'lucide-react';

const ProductControls = ({ currentFilter, onFilterChange, searchQuery, onSearchChange }) => {
  // Use the correct statuses from your API data
  const filters = ['All', 'NORMAL', 'DRAFT', 'FEATURE'];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
      <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap capitalize transition-all duration-200 ${
              currentFilter === filter 
              ? 'bg-[#FFE8CD] text-[#2f153c]' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.toLowerCase()}
          </button>
        ))}
      </div>
      
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default ProductControls;
