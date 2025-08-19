'use client';

import React, { useState, useCallback } from 'react';
import ProductsHeader from './ProductHeader';
import ProductTable from './ProductTable';
import ProductFormModal from './ProductFormModal';

const ProductsPage = () => {
  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // This key is used to force the ProductTable to re-mount and re-fetch its data
  const [refreshKey, setRefreshKey] = useState(0);

  // --- HANDLERS ---
  const handleAddProduct = () => {
    setModalMode('add');
    setSelectedProductId(null); 
    setIsModalOpen(true);
  };
  
  const handleEditProduct = (productToEdit) => {
    setModalMode('edit');
    setSelectedProductId(productToEdit.id);
    setIsModalOpen(true);
  };
  
  const handleFormSuccess = () => {
    setIsModalOpen(false);
    // When the form succeeds, change the key to trigger a refresh in ProductTable
    setRefreshKey(oldKey => oldKey + 1); 
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ProductsHeader onAddProduct={handleAddProduct} />
      
      {/* The `key` prop is enough to force a full remount and data refetch */}
      <ProductTable key={refreshKey} onEdit={handleEditProduct} />

      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mode={modalMode}
          productId={selectedProductId}
          onSubmitSuccess={handleFormSuccess} 
        />
      )}
    </div>
  );
}

export default ProductsPage;
