// src/index.js
const express = require("express");
const app = express();
const port = 3000;

const tasksRouter = require("./routes/tasks");

// middleware
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

// tasks route
app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
