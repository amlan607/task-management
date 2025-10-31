const express = require('express');
const app = express();
const port = 3000;

const tasks = [
    { 
        id: 1, 
        title: 'Learn Node.js', 
        completed: false, 
        priority: 'high',
        createdAt: new Date('2024-01-15')
    },
    { 
        id: 2, 
        title: 'Build REST API', 
        completed: false, 
        priority: 'medium',
        createdAt: new Date('2024-01-16')
    },
    { 
        id: 3, 
        title: 'Set up database', 
        completed: true, 
        priority: 'high',
        createdAt: new Date('2024-01-14')
    },
    { 
        id: 4, 
        title: 'Write documentation', 
        completed: false, 
        priority: 'low',
        createdAt: new Date('2024-01-17')
    },
    { 
        id: 5, 
        title: 'Deploy application', 
        completed: false, 
        priority: 'medium',
        createdAt: new Date('2024-01-18')
    }
];

app.get('/', (req, res) => {
    res.send('Task Management API is running!');
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime()
    });
});