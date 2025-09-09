// src/utils/apiRoutes.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Centralized API endpoints
const API_ROUTES = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    signup: `${BASE_URL}/api/auth/register`,
    logout: `${BASE_URL}/api/auth/logout`,
    forget: `${BASE_URL}/api/auth/request/reset-password`,
    reset: `${BASE_URL}/api/auth/reset-password`,
    googleLogin: `${BASE_URL}/api/auth/google`,
    addresses: `${BASE_URL}/api/auth/addresses`,
    autofillAddress: `${BASE_URL}/api/auth/addresses/autofill`,
  },
  products: {
    getAllbyAdmin: `${BASE_URL}/api/admin/products`,
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
    getProfile: `${BASE_URL}/api/auth/me`,
    getProductById: (id) => API_ROUTES.products.getById(id),
    getAllProducts: `${BASE_URL}/api/products`,
  },
};


export { API_ROUTES };