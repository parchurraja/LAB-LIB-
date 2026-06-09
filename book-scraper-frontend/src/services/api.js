import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const bookAPI = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  getBooksByCategory: (categoryId) => api.get(`/books/category/${categoryId}`),
  searchBooks: (query) => api.get(`/books/search?query=${query}`),
};

export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
};

export const scraperAPI = {
  triggerScrape: () => api.post('/scraper/trigger'),
};

export const userAPI = {
  getWishlist: () => api.get('/users/wishlist'),
  toggleWishlist: (bookId) => api.post(`/users/wishlist/${bookId}`),
  getCart: () => api.get('/users/cart'),
  toggleCart: (bookId) => api.post(`/users/cart/${bookId}`),
};

export default api;
