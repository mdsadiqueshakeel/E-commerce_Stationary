import React from 'react';
import { Plus } from 'lucide-react';

const ProductsHeader = ({ onAddProduct }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Manage Products</h1>
      <button 
        onClick={onAddProduct}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2f153c] text-white rounded-lg text-sm font-medium hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 md:w-auto w-full"
      >
        <Plus size={18} />
        Add New Product
      </button>
    </div>
  );
};

export default ProductsHeader;