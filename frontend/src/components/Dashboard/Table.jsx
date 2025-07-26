import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Table = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4001/api/tasks');
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        console.error('البيانات ليست مصفوفة:', res.data);
        setTasks([]);
      }
    } catch (err) {
      console.error('فشل تحميل المهام:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('فشل الحذف:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 قائمة المهام</h1>
        <Link
          to="/CreateTask"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ إنشاء مهمة
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border"> اسم الموظف</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">اسم المستثمر</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">التاريخ</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">العمليات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.isArray(tasks) && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="p-3 border text-blue-600 hover:underline">
                    <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                  </td>
                  <td className="p-3 border">{task.investorName}</td>
                  <td className="p-3 border">
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleString('ar-EG', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </td>
                  <td className="p-3 border">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        حذف
                      </button>
                      <Link
                        to={`/tasks/edit/${task._id}`}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        تعديل
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  لا توجد مهام حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
