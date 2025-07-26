import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Menu from '../Menu/Menu';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const CreateTask = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    details: [],
    done:false
  });
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tasks/getNames`);
        setNames(response.data.names);
      } catch (err) {
        console.log(err);
        toast.error('فشل في جلب الأسماء');
      }
    };
  
    fetchNames();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/tasks`, formData);
      toast.success('تم إنشاء المهمة بنجاح');
      setFormData({
        name: '',
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
        details: [],
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطأ أثناء إنشاء المهمة');
    }
  };

  return (
    <div>
      <Menu />
      <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-xl my-16">
        <h1 className="text-2xl font-bold mb-6">عمل مهمة</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* حقل اختيار الاسم */}
          <div>
            <label className="block mb-1 font-medium">اسم الموظف</label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
            >
              <option value="">اختر موظفاً</option>
              {names.map((n, idx) => (
                <option key={idx} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* بقية الحقول */}
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
            { name: 'investorName', label: 'اسم المستثمر' }
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

          {/* زر الإنشاء */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
            >
              إنشاء مهمة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
