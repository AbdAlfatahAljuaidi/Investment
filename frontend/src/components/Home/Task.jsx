import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../Menu/Menu';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedTask, setEditedTask] = useState({});
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/tasks/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        
        setTask(res.data);
        setEditedTask(res.data);
        setLoading(false);
      } catch (err) {
        console.error("فشل في جلب المهمة:", err);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/api/tasks/${id}`, editedTask, {
        withCredentials: true,
      });
      alert("تم تحديث المهمة بنجاح");
    } catch (err) {
      console.error("خطأ في تحديث المهمة:", err);
      alert("فشل تحديث المهمة");
    }
  };

  if (loading) return <p className="text-center mt-10">جارٍ التحميل...</p>;
  if (!task) return <p className="text-center mt-10">المهمة غير موجودة</p>;

  return (
    <div>
      <Menu />
   
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg mt-10" dir="rtl">
      <h2 className="text-3xl font-bold mb-6 text-center">تعديل المهمة</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        {/* نوع المذكرة أو الاهتمام */}
        <div>
          <label className="block mb-1 font-semibold">نوع المذكرة أو الاهتمام</label>
          <input
            type="text"
            name="noteType"
            value={editedTask.noteType || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* نوع الأصل أو الخدمة */}
        <div>
          <label className="block mb-1 font-semibold">نوع الأصل أو الخدمة</label>
          <input
            type="text"
            name="assetOrServiceType"
            value={editedTask.assetOrServiceType || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ملكية الأرض */}
        <div>
          <label className="block mb-1 font-semibold">ملكية الأرض</label>
          <input
            type="text"
            name="landOwnership"
            value={editedTask.landOwnership || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* موقع المشروع */}
        <div>
          <label className="block mb-1 font-semibold">موقع المشروع</label>
          <input
            type="text"
            name="projectLocation"
            value={editedTask.projectLocation || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* فئة المشروع */}
        <div>
          <label className="block mb-1 font-semibold">فئة المشروع</label>
          <input
            type="text"
            name="projectCategory"
            value={editedTask.projectCategory || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* رقم ضابط الاتصال */}
        <div>
          <label className="block mb-1 font-semibold">رقم ضابط الاتصال</label>
          <input
            type="text"
            name="contactOfficerNumber"
            value={editedTask.contactOfficerNumber || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* اسم ضابط الاتصال */}
        <div>
          <label className="block mb-1 font-semibold">اسم ضابط الاتصال</label>
          <input
            type="text"
            name="contactOfficerName"
            value={editedTask.contactOfficerName || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* اسم ضابط الاتصال من الشركة/البلد الأمين */}
        <div>
          <label className="block mb-1 font-semibold">اسم ضابط الاتصال من الشركة/البلد الأمين</label>
          <input
            type="text"
            name="externalOfficerName"
            value={editedTask.externalOfficerName || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* الدولة */}
        <div>
          <label className="block mb-1 font-semibold">الدولة</label>
          <input
            type="text"
            name="country"
            value={editedTask.country || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* مساحة الموقع */}
        <div>
          <label className="block mb-1 font-semibold">مساحة الموقع (متر مربع)</label>
          <input
            type="number"
            name="siteArea"
            value={editedTask.siteArea || ''}
            onChange={handleChange}
            required
            min={0}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* رمز الموقع */}
        <div>
          <label className="block mb-1 font-semibold">رمز الموقع</label>
          <input
            type="text"
            name="siteCode"
            value={editedTask.siteCode || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* اسم المستثمر */}
        <div>
          <label className="block mb-1 font-semibold">اسم المستثمر</label>
          <input
            type="text"
            name="investorName"
            value={editedTask.investorName || ''}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* زر الحفظ */}
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            تحديث المهمة
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Task;
