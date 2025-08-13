// src/utils/apiClient.js
import axios from "axios";

const apiClient = {
  get: async (url, config = {}) => {
    const res = await axios.get(url, config);
    return res.data;
  },
  post: async (url, data, config = {}) => {
    const res = await axios.post(url, data, config);
    return res.data;
  },
  put: async (url, data, config = {}) => {
    const res = await axios.put(url, data, config);
    return res.data;
  },
  delete: async (url, config = {}) => {
    const res = await axios.delete(url, config);
    return res.data;
  },
};

export default apiClient;
