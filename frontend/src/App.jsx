
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

function App() {
  const location = useLocation()
  const [check,setCheck] = useState(false)


  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4001/verifyUserToken", {
          withCredentials: true
        });
        if(response.data.error==false){
          setCheck(true)
        }
     
      } catch (error) {
        console.error("فشل في جلب المهام", error);
      }
    };

    fetchTasks();
  }, []);


  return (
    <div dir='rtl'>

<ToastContainer
      theme='dark'
      />
    <AnimatePresence mode='wait'>
 <Routes location={location} key={location.pathname}>
      <Route path='/' element={<SignUp />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/Dashboard' element={check ? <Dashboard /> : <Navigate to="/Login" />} />
      <Route path='/Table' element={check ? <Table /> : <Navigate to="/Login" />} />
      <Route path='/Dashboard' element={check ? <Dashboard /> : <Navigate to="/Login" />} />
      <Route path='/tasks/:id' element={check ? <TaskDetails /> : <Navigate to="/Login" />} />


      <Route path='/tasks/edit/:id' element={check ? <EditTask /> : <Navigate to="/Login" />} />
      <Route path='/task/:id' element={check ? <Task /> : <Navigate to="/Login" />} />
      <Route path='/CreateTask' element={check ? <CreateTask /> : <Navigate to="/Login" />} />
      <Route path='/:taskId/AddDetailForm' element={check ? <AddDetailForm /> : <Navigate to="/Login" />} />
      <Route path='/:taskId/MoreInfo' element={check ? <MoreInfo /> : <Navigate to="/Login" />} />
    </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
