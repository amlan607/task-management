// src/index.js
const express = require("express");
const app = express();
const port = 3000;

const tasksRouter = require("./routes/tasks");

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

// ✅ Health check route (Assignment 2)
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(), // returns the number of seconds the server has been running
  });
});

// Tasks route
app.use("/tasks", tasksRouter);

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
