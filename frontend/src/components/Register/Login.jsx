import React, { useState } from 'react';
import axios from 'axios';
import bgImage from '../../assets/Register.jpg';
import { FaEnvelope, FaLock } from "react-icons/fa";
import {motion} from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
 const [disable,setDisable] = useState(false)
    const navigate=useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setDisable(true)
      const res = await axios.post(
        "http://localhost:4001/login",
        form,
        { withCredentials: true }
      );
toast.success(res.data.message)
navigate("/Home")
      
      // هنا ممكن تعمل توجيه مثلا: navigate('/dashboard');
    } catch (err) {
        setDisable(false)
      console.error(err);
      toast.error(err.response?.data?.error || "فشل تسجيل الدخول")
    }
  };

  return (
    <motion.div
    
initial={{x:"-100vw"}}
animate={{x:0}}
exit={{y:"-100vh"}}

transition={{
  duration:0.3
}}
      dir='rtl'
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="bg-opacity-20 bg-transparent backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">تسجيل الدخول</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* البريد الإلكتروني */}
          <div className="flex items-center gap-3 border-b border-white/40 py-2">
            <FaEnvelope className="text-white text-xl" />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              className="bg-transparent flex-grow text-white placeholder-white focus:outline-none rounded"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* كلمة المرور */}
          <div className="flex items-center gap-3 border-b border-white/40 py-2">
            <FaLock className="text-white text-xl" />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              className="bg-transparent flex-grow text-white placeholder-white focus:outline-none rounded"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded py-3 font-semibold  ${disable 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    }`}
          >
           {disable ? "جاري تسجيل الدخول" : " تسجيل الدخول"}
          </button>
        </form>


        {/* روابط إضافية */}
        <div className="mt-6 text-center space-y-3">
          {/* <a
            href="/forgot-password"
            className="text-white hover:text-white underline text-sm block"
          >
            هل نسيت كلمة المرور؟
          </a> */}
          <p className="text-white text-sm">
            ليس لديك حساب؟{" "}
            <Link to={"/"} className="underline hover:text-white">
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
