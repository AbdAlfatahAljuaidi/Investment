import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu/Menu';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/Getallusers`, { withCredentials: true });
      setUsers(res.data);
    } catch (err) {
      alert('فشل في تحميل المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const changeRole = async (id, currentRole) => {
    const newRole = !currentRole; // عكس القيمة الحالية
    try {
      await axios.put(`${apiUrl}/Changeuserrole/${id}`, { role: newRole }, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      alert('فشل في تغيير الصلاحية');
    }
  };
  

  const deleteUser = async (id) => {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`${apiUrl}/Deleteuser/${id}`, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      alert('فشل في الحذف');
    }
  };

  return (
<div>
    <Menu />

    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">قائمة الموظفين</h2>

      {loading ? (
        <p>جار التحميل...</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm text-right">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">الاسم</th>
              <th className="p-2 border">البريد</th>
              <th className="p-2 border">الصلاحية</th>
              <th className="p-2 border">تغيير الصلاحية</th>
              <th className="p-2 border">حذف</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-gray-700">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role ? 'مدير' : 'موظف'}</td>
<td className="p-2 border">
  <button
    onClick={() => changeRole(u._id, u.role)}
    className="bg-yellow-500 text-white px-3 py-1 rounded"
  >
    تحويل إلى {u.role ? 'موظف' : 'مدير'}
  </button>
</td>

                <td className="p-2 border">
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
</div>
  );
};

export default Employees;
