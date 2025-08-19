'use client';

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, ChevronDown, ImageOff } from 'lucide-react';
import { API_ROUTES } from '@/utils/apiRoutes';
import apiClient from '@/utils/apiClients';
import ProductControls from './ProductControl';
import Pagination from './Pagination';

// Accept the new 'refreshTrigger' prop
const ProductTable = ({ onEdit, refreshTrigger }) => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(API_ROUTES.products.getAllbyAdmin);
        setProducts(Array.isArray(response) ? response : []);
      } catch (err) {
        setError("Failed to fetch products.");
        setProducts([]);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [refreshTrigger]); // THE FIX: This now re-runs whenever refreshTrigger changes

  // --- API HANDLERS ---
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await apiClient.delete(API_ROUTES.products.delete(id));
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  const [updatingStatus, setUpdatingStatus] = useState(null);
  
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      await apiClient.patch(API_ROUTES.products.status(id), { status: newStatus });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // --- FILTERING & PAGINATION ---
  const filteredProducts = React.useMemo(() => {
    let result = products;
    if (currentFilter !== "All")
      result = result.filter((p) => p.status === currentFilter);
    if (searchQuery)
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return result;
  }, [products, currentFilter, searchQuery]);

  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getStatusChipClass = (status) => {
    switch (status) {
      case "NORMAL": return "bg-green-100 text-green-800";
      case "FEATURE": return "bg-yellow-100 text-yellow-800";
      case "DRAFT": default: return "bg-gray-100 text-gray-800";
    }
  };

  const cleanImageUrl = (url) => {
    const awsPrefix = "https://e-commerce091.s3.ap-south-1.amazonaws.com/";
    if (url && url.startsWith(awsPrefix + "https://")) {
      return url.substring(awsPrefix.length);
    }
    return url;
  };

  // --- RENDER LOGIC ---
  if (isLoading) return <div className="text-center p-10">Loading products...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-md text-[#2f153c] p-4 md:p-6">
      <ProductControls
        currentFilter={currentFilter}
        onFilterChange={(filter) => {
          setCurrentFilter(filter);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">Product</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">SKU</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">Price</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">Stock</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {currentItems.length > 0 ? (
              currentItems.map((product) => {
                const imageUrl = cleanImageUrl(product.images?.[0]?.url);
                return (
                  <tr key={product.id} className="hover:bg-[#FFE8CD]/30">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.title} className="h-full w-full object-cover rounded-md" />
                          ) : (
                            <ImageOff className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{product.title}</div>
                          <div className="text-xs text-gray-500">{product.brand || "No Brand"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">{product.productCode || "N/A"}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      {product.discountedPrice && product.discountedPrice < product.price ? (
                        <div>
                          <span className="font-bold">${product.discountedPrice.toFixed(2)}</span>
                          <span className="ml-2 line-through text-gray-400">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">{product.stockQuantity}</td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusChipClass(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-3">
                        <button onClick={() => onEdit(product)}><Edit size={16} /></button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-500"><Trash2 size={16} /></button>
                        {/* Status Change Select Dropdown */}
                        <div className="relative">
                          {updatingStatus === product.id ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin mr-2"></div>
                              <span className="text-xs">Updating...</span>
                            </div>
                          ) : (
                            <select
                              value={product.status}
                              onChange={(e) => handleStatusUpdate(product.id, e.target.value)}
                              className="block w-full py-1 px-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {["NORMAL", "DRAFT", "FEATURE"].map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No products found for the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={filteredProducts.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default ProductTable;
