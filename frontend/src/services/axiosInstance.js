import axios from 'axios';

// Create an axios instance
export const axiosInstance = axios.create({
  baseURL: 'https://a82f-115-160-223-174.ngrok-free.app', 
  headers: {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "skip-browser-warning",
  },
  
});
axiosInstance.interceptors.request.use((request) => {
  if(!request.headers['authorization']) {
    request.headers['authorization']=`Bearer ${localStorage.getItem('token')}`;
  }
  return request;
});
