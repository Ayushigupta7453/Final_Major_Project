import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;


// Reviews helpers
export const getReviews = (submissionId) => api.get(`/reviews/${submissionId}`);
export const upsertReview = (submissionId, data) => api.post(`/reviews/${submissionId}`, data);
