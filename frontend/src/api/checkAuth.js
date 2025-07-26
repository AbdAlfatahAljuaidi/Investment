// src/api/checkAuth.js
import axios from 'axios';

export const checkAuth = async () => {
  try {
    const res = await axios.get('http://localhost:4001/api/check-auth', {
      withCredentials: true,
    });
    return res.data.authenticated;
  } catch (err) {
    return false;
  }
};
