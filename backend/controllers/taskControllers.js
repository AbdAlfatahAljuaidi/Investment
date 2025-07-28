// controllers/taskController.js
const Task = require("../models/Task");
const jwt = require('jsonwebtoken')
const {User} = require("../models/user")
const email = require("../utils/email")

// إنشاء مهمة جديدة
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: "تم إنشاء المهمة بنجاح", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء إنشاء المهمة" });
  }
};

// جلب جميع المهام
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب المهام" });
  }
};

// جلب مهمة واحدة
exports.getTaskById = async (req, res) => {
  try {
    
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "المهمة غير موجودة" });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "حدث خطأ" });
  }
};



exports.getUserTasks = async (req, res) => {
  try {
  

    const token = req.cookies?.token;
  

    if (!token) {
 
      return res.status(401).json({ error: "غير مصرح" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName = decoded.name;
 

    const tasks = await Task.find({ name: userName, done: false });
 

    res.status(200).json(tasks);1
  } catch (err) {
    console.error("❌ حدث خطأ:", err);
    res.status(500).json({ error: "حدث خطأ", err });
  }
};





// تحديث مهمة
exports.updateTask = async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "تم التحديث بنجاح", task: updated });
  } catch (err) {
    res.status(500).json({ error: "فشل التحديث" });
  }
};

// حذف مهمة
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "تم الحذف بنجاح" });
  } catch (err) {
    res.status(500).json({ error: "فشل في الحذف" });
  }
};


exports.getNames = async (req, res) => {
  try {
    const users = await User.find({}, "name"); // يرجع فقط الاسم من كل مستخدم
    const names = users.map((user) => user.name);
    console.log("names",names);
    
    res.status(200).json({ names });
  } catch (error) {
    res.status(500).json({ message: "خطأ في الخادم", error: error.message });
  }
}


exports.addDetails = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "مطلوب تسجيل الدخول" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employeeName = decoded.name;

    if (!employeeName) {
      return res.status(401).json({ message: "اسم الموظف غير موجود في التوكن" });
    }

    const { taskId } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "الوصف مطلوب" });
    }

    console.log("taskId",taskId,"description",description,"employeeName",employeeName);
    

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "المهمة غير موجودة" });
    }

    task.details.push({
      employee: employeeName,
      description,
      done: false,
      time: new Date()
    });

    await task.save();

    res.status(200).json({ message: "تمت الإضافة بنجاح", task });

  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "توكن غير صالح" });
    }
    res.status(500).json({ message: "خطأ في الخادم" });
  }
};

exports.getDetails = async (req, res) => {
  try {
    const { taskId } = req.params;

    // التحقق من وجود المهمة
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'لم يتم العثور على المهمة' });
    }

    // إرجاع التفاصيل
    res.json(task.details);
  } catch (error) {
    console.error('خطأ في جلب التفاصيل:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء جلب التفاصيل' });
  }
}

// PATCH /api/tasks/:taskId/details/:detailId
exports.handleToggleDone = async (req, res) => {
  const { taskId, detailId } = req.params;
  const { done } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId, "details._id": detailId },
      { $set: { "details.$.done": done } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "المهمة أو التفصيل غير موجود" });
    }

const Email  = "Mazen834@gmail.com"
const link = `https://investment-1-iu3q.onrender.com/${taskId}/TaskDetailsPage`;

    await email(
      Email,
      link,
      "Check Tasks Status",
      "sendEmail",
  )




    res.json({ message: "تم تحديث حالة الإنجاز", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "فشل التحديث" });
  }
};

