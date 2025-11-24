const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all tasks with pagination
router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (limit > 50) limit = 50;

    const offset = (page - 1) * limit;

    const [countResult] = await db.query('SELECT COUNT(*) AS total FROM tasks');
    const totalTasks = countResult[0].total;

    const [rows] = await db.query(
      'SELECT * FROM tasks ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
      data: rows,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = router;
