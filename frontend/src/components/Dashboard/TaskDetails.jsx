import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
  FaCalendarAlt,
  FaGlobe,
} from 'react-icons/fa';
import { MdCategory, MdOutlineLocationOn } from 'react-icons/md';
import { HiOutlineIdentification } from 'react-icons/hi';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/tasks/${id}`, {
          withCredentials: true,
        });
        setTask(res.data);
      } catch (err) {
        setError('فشل في تحميل تفاصيل المهمة');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">جاري التحميل...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>
    );
  if (!task)
    return (
      <p className="text-center mt-10 text-gray-600 font-semibold">
        المهمة غير موجودة
      </p>
    );

    const DetailCard = ({ icon: Icon, label, value }) => (
      <div className="flex items-start gap-3 border rounded-lg p-4 shadow-sm bg-gray-50">
        {Icon && <Icon className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />}
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-gray-800 font-semibold whitespace-pre-wrap min-h-[3rem]">
            {value || '—'}
          </p>
        </div>
      </div>
    );
    

  return (
    <div>
      <Menu />

      <div
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold mb-6 border-b pb-3 text-gray-800 text-center">
          تفاصيل المهمة الاستثمارية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DetailCard
            label="نوع المذكرة أو الاهتمام"
            value={task.noteType}
            icon={MdCategory}
          />
          <DetailCard
            label="نوع الأصل أو الخدمة"
            value={task.assetOrServiceType}
            icon={MdCategory}
          />
          <DetailCard
            label="ملكية الأرض"
            value={task.landOwnership}
            icon={FaMapMarkerAlt}
          />
          <DetailCard
            label="موقع المشروع"
            value={task.projectLocation}
            icon={MdOutlineLocationOn}
          />
          <DetailCard
            label="فئة المشروع"
            value={task.projectCategory}
            icon={MdCategory}
          />
          <DetailCard
            label="رقم ضابط الاتصال"
            value={task.contactOfficerNumber}
            icon={FaPhone}
          />
          <DetailCard
            label="اسم ضابط الاتصال"
            value={task.contactOfficerName}
            icon={FaUserTie}
          />
          <DetailCard
            label="اسم ضابط الاتصال من الشركة/البلد الأمين"
            value={task.name}
            icon={FaUserTie}
          />
          <DetailCard label="الدولة" value={task.country} icon={FaGlobe} />
          <DetailCard
            label="مساحة الموقع"
            value={`${task.siteArea} متر مربع`}
          />
          <DetailCard
            label="رمز الموقع"
            value={task.siteCode}
            icon={HiOutlineIdentification}
          />
          <DetailCard
            label="اسم المستثمر"
            value={task.investorName}
            icon={FaUserTie}
          />
          <DetailCard
            label="تاريخ الإنشاء"
            value={new Date(task.createdAt).toLocaleString('ar-EG')}
            icon={FaCalendarAlt}
          />
       <Link to={`/${task._id}/TaskDetailsPage`}> <button className='bg-blue-500 text-white py-2 px-5 rounded-md '>معلومات اضافية</button></Link>
        </div>


        <button
          onClick={() => navigate(-1)}
          className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition mx-auto"
        >
          <FaArrowLeft />
          رجوع
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
