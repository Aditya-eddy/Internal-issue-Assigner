const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const { TaskDetails } = require("../models/Task");
const {CompletedTaskDetails} = require("../models/CompletedTask")
// POST endpoint to save task details
router.post("/postAssignmentForm", async (req, res) => {
  try {
    const rows = req.body.rows;
    const savedTasks = [];

    for (const taskData of rows) {
      const {
        itDept,
        appName,
        activityName,
        itPic,
        userDept,
        start,
        end,
        status,
        remarks,
      } = taskData;

      // Convert 'start' and 'end' to Date objects with only the date portion
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0); // Set time to midnight
      const endDate = new Date(end);
      endDate.setHours(0, 0, 0, 0); // Set time to midnight

      // Create a new task document
      const newTask = new TaskDetails({
        itDept,
        appName,
        activityName,
        itPic,
        userDept,
        start: startDate,
        end: endDate,
        status,
        remarks,
      });

      // Save the new task to the database
      const savedTask = await newTask.save();
      savedTasks.push(savedTask);
    }

    return res.json(savedTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//POST endpoint for save completedTaskDetails
router.post("/completedpostAssignmentForm", async (req, res) => {
  try {
    const rows = req.body.chat;
    console.log(rows)
    const savedTasks = [];

    for (const taskData of rows) {
      const {
        itDept,
        appName,
        activityName,
        itPic,
        userDept,
        start,
        end,
        status,
        remarks,
      } = taskData;

      // Convert 'start' and 'end' to Date objects with only the date portion
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0); // Set time to midnight
      const endDate = new Date(end);
      endDate.setHours(0, 0, 0, 0); // Set time to midnight

      // Create a new task document
      const newTask = new CompletedTaskDetails({
        itDept,
        appName,
        activityName,
        itPic,
        userDept,
        start: startDate,
        end: endDate,
        status,
        remarks,
      });

      // Save the new task to the database
      const savedTask = await newTask.save();
      savedTasks.push(savedTask);
    }

    return res.json(savedTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET endpoint to retrieve all task details with only the date part
router.get("/getAssignmentForm", async (req, res) => {
  try {
    // Retrieve all task details from the database, projecting only necessary fields
    const allTasks = await TaskDetails.find();

    return res.json(allTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAssignmentFormCompleted", async (req, res) => {
  try {
    // Retrieve all task details from the database, projecting only necessary fields
    const allTasks = await CompletedTaskDetails.find();

    return res.json(allTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteAssignmentFormById/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate that taskId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid Task ID" });
    }

    // Find the task by ID and delete it
    const deletedTask = await TaskDetails.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ success: true, deletedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteCompletedAssignmentFormById/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // Validate that taskId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid Task ID" });
    }

    // Find the task by ID and delete it
    const deletedTask = await CompletedTaskDetails.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ success: true, deletedTask });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
