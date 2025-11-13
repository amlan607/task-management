// src/routes/tasks.js
const express = require("express");
const router = express.Router();

// generate 5 sample tasks
const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    priority: "high",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Build REST API",
    completed: true,
    priority: "medium",
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Test API with Postman",
    completed: false,
    priority: "low",
    createdAt: new Date()
  },
  {
    id: 4,
    title: "Write Documentation",
    completed: false,
    priority: "medium",
    createdAt: new Date()
  },
  {
    id: 5,
    title: "Push Code to GitHub",
    completed: true,
    priority: "high",
    createdAt: new Date()
  }
];

// GET /tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

module.exports = router;
