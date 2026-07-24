import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // Crucial for sending JWT cookies to the backend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Automatically attach Bearer token if present in localStorage or cookies (Phase 5 & 9)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 session expiration gracefully (Phase 10 & 13)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('[API Auth] Session authorization token missing or expired:', error.response.data?.message);
    }
    return Promise.reject(error);
  }
);

export default api;
