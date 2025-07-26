// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "غير مصرح" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "توكن غير صالح" });
  }
};
