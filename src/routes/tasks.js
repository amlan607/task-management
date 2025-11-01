const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id - Get task by ID (WITH ENHANCED ERROR HANDLING)
router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // NEW: Check if ID is valid number
    if (isNaN(taskId)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    res.json(task);
});

module.exports = router;
