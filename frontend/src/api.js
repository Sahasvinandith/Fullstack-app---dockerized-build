// mern-auth-app/frontend/src/api.js
import axios from 'axios';

// Create an Axios instance with a base URL for your backend API
const api = axios.create({
  baseURL: 'http://localhost:5000', // Default to localhost for development
});

export default api;
