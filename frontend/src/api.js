import axios from "axios";

// In development, use the backend server URL
// In production (Vercel), use relative paths
const getBaseURL = () => {
  // If environment variable is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // In development (localhost), use the backend server
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000/api';
  }
  
  // In production (Vercel), use relative paths
  return '/api';
};

export default axios.create({
  baseURL: getBaseURL(),
});
