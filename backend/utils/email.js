const { createTransport } = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();


module.exports = async (to, link, subject, template) => {

    try {
      const transporter = createTransport({
        host: process.env.HOST,
        port: 587,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      const handlebarsOptions = {
        viewEngine: {
          extname: ".handlebars",
          partialsDir: path.resolve("./views"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./views"),
        extName: ".handlebars",
      };
  
      transporter.use("compile", hbs(handlebarsOptions));
  
      const mailOptions = {
        from: {
          name: "Investment Team",
          address: process.env.EMAIL,
        },
        to: to,
        subject: subject, // مثلاً: "تم التعليق على منشورك"
        template: template, // مثلاً: 'postCommentNotification'
        context: {
          link, // اسم صاحب المنشور
        
        },
      };
  
      return transporter.sendMail(mailOptions);
    } catch (error) {
      console.log("Email send error:", error);
    }
  };
  

