const express = require("express");
const router = express.Router();

// 5 Sample Tasks
const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Build REST API",
    completed: true,
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Test API with Postman",
    completed: false,
    priority: "low",
    createdAt: new Date(),
  },
  {
    id: 4,
    title: "Write Documentation",
    completed: false,
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: 5,
    title: "Push Code to GitHub",
    completed: true,
    priority: "high",
    createdAt: new Date(),
  },
];

// ✅ GET /tasks → Return all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// ✅ GET /tasks/:id → Return task by ID with enhanced error handling (Assignment 5)
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Assignment 5: Error handling for invalid IDs
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format"
      });
    }

    // Check for negative IDs
    if (id < 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format"
      });
    }

    // Check for non-integer IDs (if somehow parsed as float)
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format"
      });
    }

    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found"
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

module.exports = router;