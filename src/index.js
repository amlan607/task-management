const express = require('express');
const app = express();
const port = 3000;

// Import the tasks router
const tasksRouter = require('./routes/tasks');

// Basic route
app.get('/', (req, res) => {
    res.send('Task Management API is running!');
});

// Health route
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime()
    });
});

// Use the tasks router for all /tasks routes
app.use('/tasks', tasksRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});