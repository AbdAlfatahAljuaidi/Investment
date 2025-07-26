// src/api/checkAuth.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export const checkAuth = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/check-auth`, {
      withCredentials: true,
    });
    return res.data.authenticated;
  } catch (err) {
    return false;
  }
};
