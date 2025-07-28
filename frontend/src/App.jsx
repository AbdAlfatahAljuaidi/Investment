
import {Routes,Route,useLocation,Navigate } from 'react-router-dom'
import SignUp from './components/Register/Signup'
import Login from './components/Register/Login'
import Home from './components/Home/Home'
import Dashboard from './components/Dashboard/Dashboard'
import Table from './components/Dashboard/Table'
import TaskDetails from './components/Dashboard/TaskDetails'
import EditTask from './components/Dashboard/EditTask'
import Task from './components/Home/Task'
import CreateTask from './components/Dashboard/CreateTask'
import AddDetailForm from './components/Home/AddDetailForm'
import { AnimatePresence } from 'framer-motion'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import MoreInfo from './components/Dashboard/MoreInfo'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TaskDetailsPage from './components/Home/AddDetailForm'
import AddDetail from './components/Home/AddDetail'
import Charts from './components/Dashboard/Charts'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

function App() {
  const location = useLocation()
  const [check,setCheck] = useState(false)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/verifyUserToken`, {
          withCredentials: true
        });
        if (response.data.error === false) {
          setCheck(true);
        }
      } catch (error) {
        console.error("فشل في جلب التحقق من التوكن", error);
      } finally {
        setLoading(false); // ⬅️ إنهاء حالة الانتظار مهما كانت النتيجة
      }
    };
  
    fetchTasks();
  }, []);

  return (
    <div dir='rtl'>
      <ToastContainer theme='dark' />
      {loading ? (
        <div className="text-center mt-20 text-xl font-bold text-gray-600">جاري التحميل...</div>
      ) : (
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<SignUp />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Dashboard' element={check ? <Dashboard /> : <Navigate to="/Login" />} />
            <Route path='/Table' element={check ? <Table /> : <Navigate to="/Login" />} />
            <Route path='/tasks/:id' element={check ? <TaskDetails /> : <Navigate to="/Login" />} />
            <Route path='/tasks/edit/:id' element={check ? <EditTask /> : <Navigate to="/Login" />} />
            <Route path='/task/:id' element={check ? <Task /> : <Navigate to="/Login" />} />
            <Route path='/CreateTask' element={check ? <CreateTask /> : <Navigate to="/Login" />} />
            <Route path='/:taskId/AddDetailForm' element={check ? <AddDetailForm /> : <Navigate to="/Login" />} />
            <Route path='/:taskId/MoreInfo' element={check ? <MoreInfo /> : <Navigate to="/Login" />} />
            <Route path='/:taskId/TaskDetailsPage' element={check ? <TaskDetailsPage /> : <Navigate to="/Login" />} />
            <Route path='/:taskId/AddDetail' element={check ? <AddDetail /> : <Navigate to="/Login" />} />
            <Route path='/Charts' element={check ? <Charts /> : <Navigate to="/Login" />} />
          </Routes>
        </AnimatePresence>
      )}
    </div>
  );
  
}

export default App
