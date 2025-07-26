import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu/Menu';
import { FaUserTie, FaMapMarkerAlt, FaIndustry } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/tasks/user-tasks", {
          withCredentials: true
        });
        setTasks(response.data);
      } catch (error) {
        console.error("فشل في جلب المهام", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Menu />

      <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map(task => (

          <div
            key={task._id}
            className="bg-white rounded-xl shadow-lg border-t-4 border-blue-600 p-5 hover:shadow-xl transition-all duration-300"
          >
            <Link to={`/tasks/${task._id}`} >
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FaIndustry className="text-blue-500" />
              {task.noteType}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Detail label="اسم الموظف" value={task.name} />
              <Detail label="اسم المستثمر" value={task.investorName} />
              <Detail label="نوع الأصل" value={task.assetOrServiceType} />
              <Detail label="ملكية الأرض" value={task.landOwnership} />
              <Detail label="الموقع" value={task.projectLocation} />
              <Detail label="فئة المشروع" value={task.projectCategory} />
              <Detail label="الدولة" value={task.country} />
              <Detail label="رمز الموقع" value={task.siteCode} />
              <Detail label="المساحة" value={`${task.siteArea} م²`} />
              <Detail label="ضابط الاتصال" value={`${task.contactOfficerName} (${task.contactOfficerNumber})`} />
              <Detail label="الضابط الخارجي" value={task.externalOfficerName} />
            </div>

            </Link>

            {task.description && (
              <div className="mt-4">
                <p className="text-gray-500 font-semibold mb-1">الوصف:</p>
                <p className="text-gray-700 text-sm leading-relaxed">{task.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-medium">{label}:</p>
    <p className="text-gray-800 font-semibold">{value}</p>
  </div>
);

export default Home;
