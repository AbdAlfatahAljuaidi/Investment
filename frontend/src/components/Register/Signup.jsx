import React, { useState } from 'react';
import axios from 'axios';
import bgImage from '../../assets/Register.jpg'; 
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import {motion} from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

    const navigate = useNavigate()
    const [disable,setDisable] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role:false
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setDisable(true)
      const res = await axios.post(
        "http://localhost:4001/signup",
        form,
        { withCredentials: true }
      );

      toast.success(res.data.message)
      navigate("/Login")
    } catch (err) {
        setDisable(false)
      console.error(err);
      toast.error(err.response?.data?.error || "فشل في إنشاء الحساب")
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
      className=" min-h-screen bg-cover bg-center  flex items-center justify-center "
      style={{
        backgroundImage:  `url(${bgImage})`,
      }}
    >
      <div className=" bg-opacity-20 bg-transparent backdrop-blur-md rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">تسجيل حساب</h2>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* اسم المستخدم */}
          <div className="flex items-center gap-3 border-b border-white/40 py-2">
            <FaUserAlt className="text-white text-xl" />
            <input
              type="text"
              name="name"
              placeholder="الاسم"
              className="bg-transparent flex-grow text-white placeholder-white focus:outline-none rounded"
              value={form.name}
              onChange={handleChange}
            />
          </div>

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
          disabled={disable}
            // type="submit"
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 transition rounded py-3 font-semibold  ${disable 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    } `}
          >
             {disable ? "جاري انشاء الحساب" : " انشاء الحساب"}
          </button>
        </form>


        {/* روابط إضافية */}
               {/* روابط إضافية */}
               <div className="mt-6 text-center space-y-3">
        
          <p className="text-white text-sm">
            هل لديك حساب؟{" "}
            <Link to={"/login"} className="underline hover:text-white">
           تسجيل دخول
            </Link>
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Signup;
