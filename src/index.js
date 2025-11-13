const express = require("express");
const app = express();
const port = 3000;

// Import routes
const tasksRouter = require("./routes/tasks");

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

// Health check (Assignment 2)
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
  });
});

// Use tasks router for all /tasks routes
app.use("/tasks", tasksRouter);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
