'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, ChevronDown, X, Upload, Check } from 'lucide-react';

const ProductsDesktop = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Mock product data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockProducts = [
      {
        id: 1,
        name: 'Premium Notebook',
        image: 'https://placehold.co/100x100/FFE8CD/2f153c?text=Notebook',
        price: 12.99,
        stock: 45,
        status: 'Normal',
        description: 'High-quality notebook with premium paper.',
        category: 'Notebooks'
      },
      {
        id: 2,
        name: 'Colored Pencil Set',
        image: 'https://placehold.co/100x100/FFDCDC/2f153c?text=Pencils',
        price: 8.99,
        stock: 30,
        status: 'Featured',
        description: 'Set of 24 colored pencils for artists.',
        category: 'Art Supplies'
      },
      {
        id: 3,
        name: 'Desk Organizer',
        image: 'https://placehold.co/100x100/FFD6BA/2f153c?text=Organizer',
        price: 24.99,
        stock: 15,
        status: 'Normal',
        description: 'Wooden desk organizer with multiple compartments.',
        category: 'Office Supplies'
      },
      {
        id: 4,
        name: 'Fountain Pen',
        image: 'https://placehold.co/100x100/FFF0E6/2f153c?text=Pen',
        price: 18.50,
        stock: 20,
        status: 'Featured',
        description: 'Elegant fountain pen with smooth writing.',
        category: 'Pens'
      },
      {
        id: 5,
        name: 'Sticky Notes Pack',
        image: 'https://placehold.co/100x100/FFE8CD/2f153c?text=Notes',
        price: 5.99,
        stock: 100,
        status: 'Normal',
        description: 'Pack of colorful sticky notes in various sizes.',
        category: 'Office Supplies'
      },
      {
        id: 6,
        name: 'Leather Journal',
        image: 'https://placehold.co/100x100/FFDCDC/2f153c?text=Journal',
        price: 29.99,
        stock: 8,
        status: 'Draft',
        description: 'Handcrafted leather journal with premium paper.',
        category: 'Notebooks'
      },
      {
        id: 7,
        name: 'Watercolor Set',
        image: 'https://placehold.co/100x100/FFD6BA/2f153c?text=Watercolor',
        price: 15.99,
        stock: 25,
        status: 'Draft',
        description: 'Professional watercolor paint set with 24 colors.',
        category: 'Art Supplies'
      }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);
  
  // Filter products based on status
  useEffect(() => {
    if (currentFilter === 'All') {
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products.filter(product => 
        product.status === currentFilter && 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [currentFilter, products, searchQuery]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Open modal for adding a new product
  const handleAddProduct = () => {
    setModalMode('add');
    setCurrentProduct({
      name: '',
      price: '',
      stock: '',
      status: 'Draft',
      description: '',
      category: '',
      image: ''
    });
    setIsModalOpen(true);
  };
  
  // Open modal for editing a product
  const handleEditProduct = (product) => {
    setModalMode('edit');
    setCurrentProduct({...product});
    setIsModalOpen(true);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      // Add new product
      const newProduct = {
        ...currentProduct,
        id: products.length + 1,
        image: currentProduct.image || 'https://placehold.co/100x100/FFE8CD/2f153c?text=New'
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id ? currentProduct : product
      );
      setProducts(updatedProducts);
    }
    
    setIsModalOpen(false);
  };
  
  // Handle product deletion
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
    }
  };
  
  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedProducts = products.map(product => 
      product.id === id ? {...product, status: newStatus} : product
    );
    setProducts(updatedProducts);
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Manage Products</h1>
        
        <button 
          onClick={handleAddProduct}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2f153c] text-white rounded-lg text-sm font-medium hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200 md:w-auto w-full"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          {/* Filter tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            {['All', 'Draft', 'Normal', 'Featured'].map((filter) => (
              <button
                key={filter}
                onClick={() => setCurrentFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${currentFilter === filter 
                  ? 'bg-[#FFE8CD] text-[#2f153c]' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Product</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Price</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Stock</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <tr key={product.id} className="hover:bg-[#FFE8CD]/30 transition-colors duration-150">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#2f153c]">{product.name}</div>
                          <div className="text-xs text-[#2f153c]/60">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">${product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2f153c]">{product.stock}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'Draft' 
                        ? 'bg-gray-100 text-gray-800' 
                        : product.status === 'Featured' 
                          ? 'bg-[#FFD6BA] text-[#2f153c]' 
                          : 'bg-[#FFE8CD] text-[#2f153c]'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleEditProduct(product)}
                          className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors duration-200"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="relative group">
                          <button className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors duration-200">
                            <ChevronDown size={16} />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            {product.status !== 'Normal' && (
                              <button 
                                onClick={() => handleStatusChange(product.id, 'Normal')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Normal
                              </button>
                            )}
                            {product.status !== 'Featured' && (
                              <button 
                                onClick={() => handleStatusChange(product.id, 'Featured')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Featured
                              </button>
                            )}
                            {product.status !== 'Draft' && (
                              <button 
                                onClick={() => handleStatusChange(product.id, 'Draft')}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#FFE8CD]/50 transition-colors duration-200"
                              >
                                Set as Draft
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-3 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-3 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredProducts.length ? filteredProducts.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === number 
                        ? 'z-10 bg-[#FFE8CD] text-[#2f153c] focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f153c]' 
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
            <div className="flex sm:hidden justify-between w-full">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#2f153c] hover:bg-[#FFE8CD]/50'}`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-[#2f153c] hover:bg-[#FFE8CD]/50'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#2f153c]">
                {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <div>
                    <label htmlFor="productImage" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                      Product Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                        {currentProduct?.image ? (
                          <img 
                            src={currentProduct.image} 
                            alt="Product preview" 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <Upload className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          id="productImage"
                          value={currentProduct?.image || ''}
                          onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                          placeholder="Enter image URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200 mb-2"
                        />
                        <p className="text-xs text-gray-500">Enter a URL or upload an image (upload functionality would be implemented in a real app)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={currentProduct?.name || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="productCategory" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    id="productCategory"
                    value={currentProduct?.category || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="productPrice" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="productPrice"
                    value={currentProduct?.price || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value) || 0})}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="productStock" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    id="productStock"
                    value={currentProduct?.stock || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value) || 0})}
                    min="0"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="productStatus" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Status *
                  </label>
                  <select
                    id="productStatus"
                    value={currentProduct?.status || 'Draft'}
                    onChange={(e) => setCurrentProduct({...currentProduct, status: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Normal">Normal</option>
                    <option value="Featured">Featured</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="productDescription" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="productDescription"
                    value={currentProduct?.description || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                    rows="4"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#FFD6BA] hover:text-[#2f153c] transition-all duration-200"
                >
                  {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsDesktop;