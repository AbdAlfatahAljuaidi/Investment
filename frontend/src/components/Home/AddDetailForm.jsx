import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Menu from '../Menu/Menu';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب التفاصيل من الـ backend
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/api/tasks/${taskId}/details`, {
        withCredentials: true,
      });
      setDetails(res.data);
    } catch (err) {
      console.error('فشل في جلب التفاصيل:', err);
      toast.error('حدث خطأ أثناء جلب التفاصيل');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [taskId]);

  // عند إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error('يرجى تعبئة وصف المهمة');
      return;
    }

    try {
      await axios.post(
        `http://localhost:4001/api/tasks/${taskId}/details`,
        { description },
        { withCredentials: true }
      );
      toast.success('تمت الإضافة بنجاح');
      setDescription('');
      fetchDetails(); // إعادة جلب التفاصيل بعد الإضافة
    } catch (error) {
      console.error('خطأ في الإضافة:', error);
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء الإضافة');
    }
  };

  return (
<div>
    <Menu />
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">إضافة تفاصيل جديدة</h3>

        <div className="mb-3">
          <label className="block mb-1 font-medium">وصف المهمة</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          إضافة
        </button>
      </form>

      <div>
  <h4 className="text-lg font-semibold mb-2">تفاصيل المهمة:</h4>
  {loading ? (
    <p>جاري التحميل...</p>
  ) : details.length === 0 ? (
    <p className="text-gray-500">لا توجد تفاصيل بعد.</p>
  ) : (
    <ul className="space-y-3">
      {details.map((detail) => (
        <li
          key={detail._id}
          className="bg-gray-100 p-3 rounded shadow flex items-start gap-3"
        >
          {/* دائرة أول حرف من الاسم */}
          <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold">
            {detail.employee?.charAt(0).toUpperCase()}
          </div>

          {/* التفاصيل */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-800">{detail.employee}</span>
              <span className="text-sm text-gray-500">
                {new Date(detail.time).toLocaleString("ar-EG", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <p className="text-gray-700">{detail.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
    </div>
  );
};

export default TaskDetailsPage;
