const express = require("express");
const router = express.Router();
const { signupUser,loginUser,checkAdmin,verifyUserToken  } = require("../controllers/authControllers");

// POST /api/auth/signup
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user-role", checkAdmin);
router.get("/verifyUserToken", verifyUserToken);

module.exports = router;
