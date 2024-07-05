const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  itDept: {
    type: String,
    required: true,
  },
  appName: {
    type: String,
    required: true,
  },
  activityName: {
    type: String,
    required: true,
  },
  itPic: {
    type: String,
    required: true,
  },
  userDept: {
    type: String,
    required: true,
  },
  start: {
    type: String,  // You might want to use a more appropriate type (e.g., Date) based on your use case
    required: true,
  },
  end: {
    type: String,  // You might want to use a more appropriate type (e.g., Date) based on your use case
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
});

const TaskDetails = mongoose.model('TaskDetails', TaskSchema);

module.exports = { TaskDetails };
