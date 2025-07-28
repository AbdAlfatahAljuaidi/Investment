const express = require("express");
const router = express.Router();
const { signupUser,loginUser,checkAdmin,verifyUserToken,Getallusers ,Deleteuser,Changeuserrole } = require("../controllers/authControllers");

// POST /api/auth/signup
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/user-role", checkAdmin);
router.get("/verifyUserToken", verifyUserToken);
router.get("/Getallusers", Getallusers);
router.put("/Changeuserrole/:id", Changeuserrole);
router.delete("/Deleteuser/:id", Deleteuser);

module.exports = router;
