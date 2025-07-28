import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import Menu from '../Menu/Menu';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Charts = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/tasks`);
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('فشل تحميل المهام:', err);
      }
    };

    fetchTasks();
  }, []);

  // 1. نسبة المهام المنجزة وغير المنجزة
  const doneCount = tasks.filter((t) => t.done).length;
  const notDoneCount = tasks.filter((t) => !t.done).length;
  const pieData = {
    labels: ['منجزة', 'غير منجزة'],
    datasets: [{
      data: [doneCount, notDoneCount],
      backgroundColor: ['#16a34a', '#dc2626'],
    }],
  };

  // 2. عدد المهام حسب نوع المذكرة (noteType)
  const noteTypeCounts = tasks.reduce((acc, task) => {
    const key = task.noteType || 'غير محدد';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const noteTypeData = {
    labels: Object.keys(noteTypeCounts),
    datasets: [{
      label: 'عدد المهام',
      data: Object.values(noteTypeCounts),
      backgroundColor: '#3b82f6',
    }],
  };

  // 3. عدد المهام لكل موظف (name)
  const nameCounts = tasks.reduce((acc, task) => {
    const key = task.name || 'غير محدد';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const nameBarData = {
    labels: Object.keys(nameCounts),
    datasets: [{
      label: 'عدد المهام لكل موظف',
      data: Object.values(nameCounts),
      backgroundColor: '#8b5cf6',
    }],
  };

  // 4. فئة المشروع (projectCategory)
  const categoryCounts = tasks.reduce((acc, task) => {
    const key = task.projectCategory || 'غير محددة';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const categoryData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'فئة المشروع',
      data: Object.values(categoryCounts),
      backgroundColor: '#f97316',
    }],
  };

  // 5. ملكية الأرض (landOwnership)
  const ownershipCounts = tasks.reduce((acc, task) => {
    const key = task.landOwnership || 'غير محددة';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const landOwnershipData = {
    labels: Object.keys(ownershipCounts),
    datasets: [{
      label: 'ملكية الأرض',
      data: Object.values(ownershipCounts),
      backgroundColor: '#10b981',
    }],
  };

  // 6. عدد المهام حسب نوع الأصل أو الخدمة (assetOrServiceType)
  const assetTypeCounts = tasks.reduce((acc, task) => {
    const key = task.assetOrServiceType || 'غير محدد';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const assetTypeData = {
    labels: Object.keys(assetTypeCounts),
    datasets: [{
      label: 'نوع الأصل أو الخدمة',
      data: Object.values(assetTypeCounts),
      backgroundColor: '#f59e0b',
    }],
  };

  // 7. عدد المهام حسب موقع المشروع (projectLocation)
  const projectLocationCounts = tasks.reduce((acc, task) => {
    const key = task.projectLocation || 'غير محدد';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const projectLocationData = {
    labels: Object.keys(projectLocationCounts),
    datasets: [{
      label: 'موقع المشروع',
      data: Object.values(projectLocationCounts),
      backgroundColor: '#6366f1',
    }],
  };

  // 8. عدد المهام حسب الدولة (country)
  const countryCounts = tasks.reduce((acc, task) => {
    const key = task.country || 'غير محدد';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const countryData = {
    labels: Object.keys(countryCounts),
    datasets: [{
      label: 'الدولة',
      data: Object.values(countryCounts),
      backgroundColor: '#ec4899',
    }],
  };

  // 9. توزيع مساحة الموقع (siteArea) - نعرض متوسط مساحة لكل موقع (siteCode)
  // لأنه عدد المهام لن يفيد هنا، نحتاج تجميع حسب siteCode وأخذ متوسط siteArea
  const siteAreaMap = {};
  tasks.forEach(task => {
    if (!siteAreaMap[task.siteCode]) {
      siteAreaMap[task.siteCode] = { totalArea: 0, count: 0 };
    }
    siteAreaMap[task.siteCode].totalArea += task.siteArea;
    siteAreaMap[task.siteCode].count += 1;
  });
  const siteAreaLabels = Object.keys(siteAreaMap);
  const siteAreaAvg = siteAreaLabels.map(code =>
    siteAreaMap[code].totalArea / siteAreaMap[code].count
  );
  const siteAreaData = {
    labels: siteAreaLabels,
    datasets: [{
      label: 'متوسط مساحة الموقع (متر مربع)',
      data: siteAreaAvg,
      backgroundColor: '#22c55e',
    }],
  };

  // 10. المواقع المشتركة بين المستثمرين (siteCode)
  const siteMap = {};
  tasks.forEach((task) => {
    const code = task.siteCode;
    const company = task.investorName || 'غير معروفة';
    if (!code) return;
    if (!siteMap[code]) siteMap[code] = new Set();
    siteMap[code].add(company);
  });
  const sharedSitesData = {
    labels: Object.keys(siteMap),
    datasets: [{
      label: 'عدد المستثمرين المهتمين',
      data: Object.values(siteMap).map((set) => set.size),
      backgroundColor: '#eab308',
    }],
  };

  return (
    <div>
      <Menu />
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <h2 className="text-3xl font-bold text-center text-gray-700">📊 الإحصائيات</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="نسبة الإنجاز">
  <div className="w-full flex justify-center items-center" style={{ maxHeight: '300px' }}>
    <div style={{ maxWidth: '300px', width: '100%' }}>
      <Pie data={pieData} />
    </div>
  </div>
</ChartCard>

       



          <ChartCard title="عدد المهام حسب نوع المذكرة">
            <Bar data={noteTypeData} />
          </ChartCard>

          <ChartCard title="عدد المهام حسب الموظف">
            <Bar data={nameBarData} />
          </ChartCard>

          <ChartCard title="عدد الأنشطة حسب فئة المشروع">
            <Bar data={categoryData} />
          </ChartCard>

          <ChartCard title="عدد المشاريع حسب ملكية الأرض">
            <Bar data={landOwnershipData} />
          </ChartCard>

          <ChartCard title="نوع الأصل أو الخدمة">
            <Bar data={assetTypeData} />
          </ChartCard>

          <ChartCard title="موقع المشروع">
            <Bar data={projectLocationData} />
          </ChartCard>

          <ChartCard title="الدولة">
            <Bar data={countryData} />
          </ChartCard>

          <ChartCard title="متوسط مساحة الموقع لكل رمز موقع">
            <Bar data={siteAreaData} />
          </ChartCard>

          <ChartCard title="عدد المستثمرين المهتمين في كل موقع">
            <Bar data={sharedSitesData} />
          </ChartCard>

        </div>
      </div>
    </div>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border">
    <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

export default Charts;
