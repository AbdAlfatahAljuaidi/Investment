import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Menu from '../Menu/Menu';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    noteType: '',
    assetOrServiceType: '',
    landOwnership: '',
    projectLocation: '',
    projectCategory: '',
    contactOfficerNumber: '',
    contactOfficerName: '',
    externalOfficerName: '',
    country: '',
    siteArea: '',
    siteCode: '',
    investorName: '',
    done: false, // <-- تم إضافة الحقل الجديد
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/tasks/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error('فشل في تحميل بيانات المهمة');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/tasks/${id}`, formData);
      toast.success('تم تحديث المهمة بنجاح');
      navigate('/Dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'فشل في تحديث المهمة');
    }
  };

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div>
      <Menu />
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl my-16" dir="rtl">
        <h1 className="text-2xl font-bold mb-6">تعديل المهمة</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'noteType', label: 'نوع المذكرة أو الاهتمام' },
            { name: 'assetOrServiceType', label: 'نوع الأصل أو الخدمة' },
            { name: 'landOwnership', label: 'ملكية الأرض' },
            { name: 'projectLocation', label: 'موقع المشروع' },
            { name: 'projectCategory', label: 'فئة المشروع' },
            { name: 'contactOfficerNumber', label: 'رقم ضابط الاتصال' },
            { name: 'contactOfficerName', label: 'اسم ضابط الاتصال' },
            { name: 'externalOfficerName', label: 'اسم ضابط الاتصال من الشركة/البلد الأمين' },
            { name: 'country', label: 'الدولة' },
            { name: 'siteArea', label: 'مساحة الموقع', type: 'number' },
            { name: 'siteCode', label: 'رمز الموقع' },
            { name: 'investorName', label: 'اسم المستثمر' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
              />
            </div>
          ))}

          {/* حقل boolean (تم التنفيذ؟) */}
          <div className="flex items-center col-span-2 gap-2">
            <input
              type="checkbox"
              name="done"
              checked={formData.done}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label htmlFor="done" className="font-medium">تم تنفيذ المهمة؟</label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              حفظ التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
