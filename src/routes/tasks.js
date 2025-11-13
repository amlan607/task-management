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

// ✅ GET /tasks/:id → Return task by ID or 404 if not found
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

module.exports = router;
