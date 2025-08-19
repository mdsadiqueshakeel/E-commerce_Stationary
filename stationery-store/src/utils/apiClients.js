// src/utils/apiClient.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // optional if you have a base URL
});

// 🔹 Add token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token"); // or whatever key you store token in
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Wrap Axios methods (return only data)
const apiClient = {
  get: async (url, config = {}) => {
    const res = await axiosInstance.get(url, config);
    return res.data;
  },
  post: async (url, data, config = {}) => {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  },
  put: async (url, data, config = {}) => {
    const res = await axiosInstance.put(url, data, config);
    return res.data;
  },
  patch: async (url, data, config = {}) => {
    const res = await axiosInstance.patch(url, data, config);
    return res.data;
  },
  delete: async (url, config = {}) => {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  },
};

export default apiClient;
