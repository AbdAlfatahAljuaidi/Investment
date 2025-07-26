// models/Task.js

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

  
  name: {
    type: String,
    required: true, // اسم الموظف
  },

  noteType: {
    type: String,
    required: true, // توقع مذكرة أو اهتمام
  },
  assetOrServiceType: {
    type: String,
    required: true // نوع الأصل أو الخدمة
  },
  landOwnership: {
    type: String,
    required: true // ملكية الأرض
  },
  projectLocation: {
    type: String,
    required: true // موقع المشروع
  },
  projectCategory: {
    type: String,
    required: true // فئة المشروع
  },
  contactOfficerNumber: {
    type: String,
    required: true // رقم ضابط الاتصال
  },
  contactOfficerName: {
    type: String,
    required: true // اسم ضابط الاتصال
  },
  externalOfficerName: {
    type: String,
    required: true // اسم ضابط الاتصال من الشركة البلد الأمين
  },
  country: {
    type: String,
    required: true // الدولة
  },
  siteArea: {
    type: Number,
    required: true // مساحة الموقع
  },
  siteCode: {
    type: String,
    required: true // رمز الموقع
  },
  investorName: {
    type: String,
    required: true // اسم المستثمر74
  },
  details: [
    {
      employee: { type: String, required: true },
      description: { type: String, required: true },
      done: { type: Boolean, default: false },
      time:{type:Date , defult:Date.now}
    }
  ],
  done:{
    type:Boolean
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
