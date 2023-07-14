
const User = require("../Models/UserModel");
const Task = require("../Models/TaskModel");

const createTask = async (req, res) => {
  try {
    const { task_title, priority, category, hours } = req.body;
    const { userId } = req.user; // Assuming you have the authenticated user's ID in the req.user object

    // Create a new task and associate it with the user ID
    console.log("IN THE CREATE TASK SERVER FUNCTION")
    const task = await Task.create({
        task_title,
        priority,
        category,
        hours,  
        user: userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task' });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming you have the authenticated user's ID in the req.user object

    // Find tasks associated with the user ID and populate the user field
    const tasks = await Task.find({ user: userId }).populate('user');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve tasks' });
  }
};

module.exports = {
  createTask,
  getUserTasks,
};
