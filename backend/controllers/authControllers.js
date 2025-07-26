const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User,userValidation} = require("../models/user");

const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // تحقق من المدخلات
    if (!name || !email || !password ) {
      return res.status(400).json({ error: "جميع الحقول مطلوبة" });
    }

    // تحقق إذا الإيميل موجود مسبقًا
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء المستخدم
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // مثلاً "موظف" أو "مدير"
    });

    await newUser.save();

    res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "حدث خطأ في الخادم" });
  }
};




const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // تحقق من المدخلات
      if (!email || !password) {
        return res.status(400).json({ error: "يرجى إدخال البريد وكلمة المرور" });
      }
  
      // تحقق إذا المستخدم موجود
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "البريد الإلكتروني غير مسجل" });
      }
  
      // تحقق من كلمة المرور
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "كلمة المرور غير صحيحة" });
      }
  
      // إنشاء JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role, name:user.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // خليه false لأنك شغال على HTTP مش HTTPS
        sameSite: "Lax", // أو "None" لو بتستخدم HTTPS
        maxAge: 24 * 60 * 60 * 1000,
      });
      
  
      // إرسال التوكن (ممكن تخزنه بالكوكيز أو ترسله كـ JSON)
      res.status(200).json({
        message: "تم تسجيل الدخول بنجاح",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "حدث خطأ في الخادم" });
    }
  };

  const checkAdmin = async (req, res) => {
    try {

 const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "مطلوب تسجيل الدخول" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName = decoded.name;


  
      if (!userName) {
        return res.status(401).json({ error: 'الكوكي غير موجود' });
      }
  
      const user = await User.findOne({ name: userName });
      if (!user) {
        return res.status(404).json({ error: 'المستخدم غير موجود' });
      }
  
      res.json({ role: user.role });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'خطأ في السيرفر' });
    }
  }


  // دالة عادية تتحقق من التوكن في الكوكيز
const verifyUserToken = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: true, message: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // بإمكانك استخدام decoded.name مثلاً للتحقق من الدور (role) لاحقًا
    res.status(200).json({ error: false, message: 'User verified', user: decoded.name });
    
  } catch (err) {
    return res.status(401).json({ error: true, message: 'Invalid token' });
  }
};


  
  module.exports = {
    signupUser,
    loginUser,
    checkAdmin,
    verifyUserToken
  };