// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");
const auth = require("../middleware/auth")

router.post('/tasks/:taskId/details/:detailId/change', taskController.handleToggleDone);
router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.get("/user-tasks",auth, taskController.getUserTasks);
router.get("/getNames", taskController.getNames);
router.post("/:taskId/details", taskController.addDetails);
router.get("/:taskId/details", taskController.getDetails);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);




module.exports = router;
