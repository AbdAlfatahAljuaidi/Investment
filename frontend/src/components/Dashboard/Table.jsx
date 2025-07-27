import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Table = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // ✅ حالة الفلتر

  // ✅ جلب المهام
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/tasks`);
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

  // ✅ حذف مهمة
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('فشل الحذف:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ تصفية المهام حسب الفلتر
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.done === true;
    if (filter === 'notDone') return task.done === false;
  });


  const exportToExcel = () => {
    const worksheetData = tasks.map((task) => ({
      'اسم الموظف': task.name,
      'اسم المستثمر': task.investorName,
      'تم الإنجاز': task.done ? 'نعم' : 'لا',
      'تاريخ الإنشاء': new Date(task.createdAt).toLocaleString('ar-EG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      'توقع مذكرة أو اهتمام':task.noteType,
      'نوع الأصل أو الخدمة':task.assetOrServiceType,
      'ملكية الأرض':task.landOwnership,
      'موقع المشروع':task.projectLocation,
      'فئة المشروع':task.projectCategory,
      'رقم ضابط الاتصال':task.contactOfficerNumber,
      'اسم ضابط الاتصال':task.contactOfficerName,
      'اسم ضابط الاتصال من الشركة البلد الأمين':task.externalOfficerName,
      'الدولة':task.country,
      ' مساحة الموقع':task.siteArea,
      'رمز الموقع':task.siteCode,

    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'المهام');
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'قائمة_المهام.xlsx');
  };
  

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📋 قائمة المهام</h1>
        <div>

        <Link
          to="/CreateTask"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
          ➕ إنشاء مهمة
        </Link>
     
        <button
  onClick={exportToExcel}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow mx-2"
>
  📥 تحميل Excel
</button>
          </div>
      </div>

      {/* ✅ قائمة الفلاتر */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded text-sm border ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          عرض الكل
        </button>
        <button
          onClick={() => setFilter('notDone')}
          className={`px-4 py-1.5 rounded text-sm border ${
            filter === 'notDone' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          غير منجزة
        </button>
        <button
          onClick={() => setFilter('done')}
          className={`px-4 py-1.5 rounded text-sm border ${
            filter === 'done' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          }`}
        >
          منجزة
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">اسم الموظف</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">اسم المستثمر</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">تم إنجاز المهمة</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">التاريخ</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-600 border">العمليات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="p-3 border text-blue-600 hover:underline">
                    <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                  </td>
                  <td className="p-3 border">{task.investorName}</td>
                  <td className="p-3 border">
                    <div className="flex justify-center items-center">
                      <input type="checkbox" checked={task.done} disabled className="w-5 h-5" />
                    </div>
                  </td>
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
                <td colSpan="5" className="text-center p-6 text-gray-500">
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
