import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Menu = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(`${apiUrl}/user-role`, {
          withCredentials: true
        });
        setRole(res.data.role);
      } catch (err) {
        console.error('فشل في جلب الدور:', err);
      }
    };

    fetchRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link to="/Home">
        <h1 className="text-2xl font-bold text-blue-700">📘 الاستثمار</h1>
      </Link>

      <nav className="flex gap-3">
        {role == true && (
          <button
            onClick={() => navigate('/Dashboard')}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            <FaTachometerAlt />
            لوحة التحكم
          </button>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          <FaSignOutAlt />
          تسجيل خروج
        </button>
      </nav>
    </header>
  );
};

export default Menu;
