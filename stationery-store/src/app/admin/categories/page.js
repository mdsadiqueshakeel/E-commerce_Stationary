'use client';

import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function CategoriesPage() {
  // State for categories
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState(null);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Mock category data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockCategories = [
      {
        id: 1,
        name: 'Notebooks',
        description: 'High-quality notebooks for all your writing needs',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 15
      },
      {
        id: 2,
        name: 'Pens & Pencils',
        description: 'Writing instruments for every occasion',
        image: 'https://images.unsplash.com/photo-1595231712325-9fedecef7575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 28
      },
      {
        id: 3,
        name: 'Desk Organizers',
        description: 'Keep your workspace tidy and efficient',
        image: 'https://images.unsplash.com/photo-1593619054909-a0f8799957c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 12
      },
      {
        id: 4,
        name: 'Art Supplies',
        description: 'Express your creativity with our art supplies',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 32
      },
      {
        id: 5,
        name: 'Calendars & Planners',
        description: 'Stay organized with our planning tools',
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 8
      },
      {
        id: 6,
        name: 'Binders & Folders',
        description: 'Organize your documents efficiently',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 14
      },
      {
        id: 7,
        name: 'Sticky Notes',
        description: 'Colorful notes for quick reminders',
        image: 'https://images.unsplash.com/photo-1606161290889-77950be90c41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 6
      },
      {
        id: 8,
        name: 'Paper Products',
        description: 'Various paper types for different needs',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
        productCount: 18
      }
    ];
    
    setCategories(mockCategories);
    setFilteredCategories(mockCategories);
  }, []);
  
  // Filter categories based on search query
  useEffect(() => {
    setFilteredCategories(categories.filter(category => 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setCurrentPage(1); // Reset to first page when search changes
  }, [categories, searchQuery]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Open modal to add new category
  const handleAddCategory = () => {
    setModalMode('add');
    setCurrentCategory({
      name: '',
      description: '',
      image: ''
    });
    setIsModalOpen(true);
  };
  
  // Open modal to edit category
  const handleEditCategory = (category) => {
    setModalMode('edit');
    setCurrentCategory({...category});
    setIsModalOpen(true);
  };
  
  // Handle delete category
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      // Add new category with a new ID
      const newCategory = {
        ...currentCategory,
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        productCount: 0
      };
      setCategories([...categories, newCategory]);
    } else {
      // Update existing category
      const updatedCategories = categories.map(category => 
        category.id === currentCategory.id ? currentCategory : category
      );
      setCategories(updatedCategories);
    }
    
    setIsModalOpen(false);
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#2f153c]">Categories Management</h1>
      
      {/* Search and Add Button */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          {/* Add Category Button */}
          <button
            onClick={handleAddCategory}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-[#2f153c] text-white rounded-lg hover:bg-[#2f153c]/90 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add New Category</span>
          </button>
          
          {/* Search */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Category Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Image</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Products</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-[#2f153c]/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((category) => (
                  <tr key={category.id} className="hover:bg-[#FFE8CD]/30 transition-colors duration-150">
                    <td className="px-3 py-4">
                      <div className="text-sm font-medium text-[#2f153c]">{category.name}</div>
                      <div className="text-xs text-[#2f153c]/60 mt-1 line-clamp-1">{category.description}</div>
                    </td>
                    <td className="px-3 py-4">
                      {category.image ? (
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-[#2f153c]">{category.productCount}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleEditCategory(category)}
                          className="text-[#2f153c]/70 hover:text-[#2f153c] transition-colors duration-200"
                          aria-label="Edit category"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-500/70 hover:text-red-500 transition-colors duration-200"
                          aria-label="Delete category"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-3 py-4 text-center text-sm text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 px-3 py-4 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredCategories.length ? filteredCategories.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredCategories.length}</span> results
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
      
      {/* Category Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#2f153c]">
                {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="categoryImage" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                      Category Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-300">
                        {currentCategory?.image ? (
                          <img 
                            src={currentCategory.image} 
                            alt="Category preview" 
                            className="h-full w-full object-cover" 
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          id="categoryImage"
                          value={currentCategory?.image || ''}
                          onChange={(e) => setCurrentCategory({...currentCategory, image: e.target.value})}
                          placeholder="Enter image URL"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200 mb-2"
                        />
                        <p className="text-xs text-gray-500">Enter a URL or upload an image (upload functionality would be implemented in a real app)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    value={currentCategory?.name || ''}
                    onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD6BA] focus:border-[#FFD6BA] transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="categoryDescription" className="block text-sm font-medium text-[#2f153c]/80 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="categoryDescription"
                    value={currentCategory?.description || ''}
                    onChange={(e) => setCurrentCategory({...currentCategory, description: e.target.value})}
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
                  {modalMode === 'add' ? 'Add Category' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}