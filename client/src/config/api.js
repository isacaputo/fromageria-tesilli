// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://fromageria-tesilli-server.vercel.app';

// Axios default configuration
import axios from 'axios';

// Set default base URL for axios
axios.defaults.baseURL = API_BASE_URL;

// Default headers
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add authentication token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add request interceptor to log requests in development
if (import.meta.env.DEV) {
  axios.interceptors.request.use(
    (config) => {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(`API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error(
        'API Response Error:',
        error.response?.status,
        error.response?.data
      );
      return Promise.reject(error);
    }
  );
}

// API helper functions
export const api = {
  // Products
  getProducts: () =>
    fetch(`${API_BASE_URL}/api/products`).then((res) => res.json()),
  getProduct: (id) =>
    fetch(`${API_BASE_URL}/api/products/${id}`).then((res) => res.json()),
  createProduct: (data) => axios.post('/api/products/create', data),
  deleteProduct: (id) => axios.delete(`/api/products/${id}`),

  // Auth
  login: (credentials) => axios.post('/api/auth/login', credentials),
  register: (userData) => axios.post('/api/auth/register', userData),

  // Orders
  createOrder: (orderData) =>
    fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    }).then((res) => res.json()),

  getOrders: () =>
    fetch(`${API_BASE_URL}/api/orders`).then((res) => res.json()),
};

export { API_BASE_URL };
export default axios;
