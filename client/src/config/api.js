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
  getProducts: async (retryCount = 0) => {
    const maxRetries = 2;

    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`API request failed (attempt ${retryCount + 1}):`, error);

      // Retry on failure, especially for cold start issues
      if (
        retryCount < maxRetries &&
        (error.message.includes('500') ||
          error.message.includes('timeout') ||
          error.message.includes('network'))
      ) {
        console.log(`Retrying request in ${(retryCount + 1) * 1000}ms...`);
        await new Promise((resolve) =>
          setTimeout(resolve, (retryCount + 1) * 1000)
        );
        return api.getProducts(retryCount + 1);
      }

      throw error;
    }
  },
  getProduct: async (id, retryCount = 0) => {
    const maxRetries = 2;

    try {
      const response = await fetch(`${API_BASE_URL}/api/products?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data || {};
    } catch (error) {
      console.error(
        `API request for product ${id} failed (attempt ${retryCount + 1}):`,
        error
      );

      // Retry on failure, especially for cold start issues
      if (
        retryCount < maxRetries &&
        (error.message.includes('500') ||
          error.message.includes('timeout') ||
          error.message.includes('network'))
      ) {
        console.log(
          `Retrying product request in ${(retryCount + 1) * 1000}ms...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, (retryCount + 1) * 1000)
        );
        return api.getProduct(id, retryCount + 1);
      }

      throw error;
    }
  },
  createProduct: (data) => axios.post('/api/products/create', data),
  deleteProduct: (id) => axios.delete(`/api/products?id=${id}`),

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

  // Health check endpoint
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    if (!response.ok) {
      throw new Error(`Health check failed! status: ${response.status}`);
    }
    return response.json();
  },
};

export { API_BASE_URL };
export default axios;
