import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Menu from '../Menu/Menu';

const MoreInfo = () => {
  const { taskId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/api/tasks/${taskId}/details`, {
          withCredentials: true,
        });
        setDetails(res.data);
      } catch (error) {
        console.error('فشل في جلب التفاصيل:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [taskId]);

  return (
    <div>

   
    <Menu />
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-4">تفاصيل المهمة:</h4>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : details.length === 0 ? (
        <p className="text-gray-500">لا توجد تفاصيل بعد.</p>
      ) : (
        <ul className="space-y-4">
          {details.map((detail) => (
            <li key={detail._id} className="bg-gray-100 p-4 rounded shadow flex items-start gap-3">
              {/* دائرة الحرف الأول */}
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {detail.employee.charAt(0).toUpperCase()}
              </div>

              <div>
                {/* الاسم والتاريخ */}
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{detail.employee}</span> –{' '}
                  {moment(detail.time).format('YYYY-MM-DD HH:mm')}
                </div>

                {/* الوصف */}
                <p className="text-gray-800">{detail.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>\
    </div>
  );
};

export default MoreInfo;
