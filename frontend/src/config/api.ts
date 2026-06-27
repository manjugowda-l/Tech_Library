import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://tech-library-vyc2.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default api;
