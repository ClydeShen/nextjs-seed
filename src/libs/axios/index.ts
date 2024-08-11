import axios from 'axios';

const BaseURL = 'http://localhost:3000';
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use((request) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  return request;
});

export default axiosInstance;
