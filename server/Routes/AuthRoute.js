const { Signup, Login, createTask, Dashboard } = require("../Controllers/AuthController");
// const { createTask, getUserTasks } = require("../Controllers/TaskController");
const { userVerification, id } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();


router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification)
router.post('/createTask',createTask)
router.get('/dashboard/:email',Dashboard)

// router.get('/getusertask',getUserTasks)


module.exports = router;