// src/utils/apiRoutes.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Centralized API endpoints
const API_ROUTES = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    signup: `${BASE_URL}/api/auth/register`,
    logout: `${BASE_URL}/api/auth/logout`,
    forget: `${BASE_URL}/api/auth/forget-password`,
    reset: `${BASE_URL}/api/auth/reset-password`,
    googleLogin: `${BASE_URL}/api/auth/google`,
  },
  products: {
    getAll: `${BASE_URL}/api/products`,
    getById: (id) => `${BASE_URL}/api/products/${id}`,
    create: `${BASE_URL}/api/admin/products/create`,
    update: (id) => `${BASE_URL}/api/admin/products/${id}`,
    delete: (id) => `${BASE_URL}/api/admin/products/${id}/delete`,
    status: (id) => `${BASE_URL}/api/admin/products/${id}/status`,
  },
  orders: {
    getAll: `${BASE_URL}/orders`,
    create: `${BASE_URL}/orders`,
    updateStatus: (id) => `${BASE_URL}/orders/${id}/status`,
  },
  users: {
    updateProfile: `${BASE_URL}/api/auth/profile`,
    getProfile: `${BASE_URL}/api/auth/profile`,
  },
};


export { API_ROUTES };