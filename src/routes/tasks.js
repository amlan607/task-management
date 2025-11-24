const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Helper: validate positive integer id
function parseId(val) {
  const id = Number(val);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

// GET tasks with search + pagination (exclude soft-deleted by default)
router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const q = req.query.q || "";

    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    const searchTerm = `%${q}%`;

    // Count non-deleted tasks matching search
    const [countResult] = await db.query(
      'SELECT COUNT(*) AS total FROM tasks WHERE title LIKE ? AND deleted_at IS NULL',
      [searchTerm]
    );
    const totalTasks = countResult[0].total;

    // Fetch page of non-deleted tasks
    const [rows] = await db.query(
      `SELECT * FROM tasks
       WHERE title LIKE ? AND deleted_at IS NULL
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [searchTerm, limit, offset]
    );

    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
      searchQuery: q,
      data: rows,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET only soft-deleted tasks
router.get('/deleted', async (req, res) => {
  try {
    // Support pagination + search similar to main list
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const q = req.query.q || "";

    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;
    const searchTerm = `%${q}%`;

    const [countResult] = await db.query(
      'SELECT COUNT(*) AS total FROM tasks WHERE title LIKE ? AND deleted_at IS NOT NULL',
      [searchTerm]
    );
    const totalTasks = countResult[0].total;

    const [rows] = await db.query(
      `SELECT * FROM tasks
       WHERE title LIKE ? AND deleted_at IS NOT NULL
       ORDER BY deleted_at DESC
       LIMIT ? OFFSET ?`,
      [searchTerm, limit, offset]
    );

    const totalPages = Math.ceil(totalTasks / limit);
    res.json({ totalTasks, totalPages, currentPage: page, limit, searchQuery: q, data: rows });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET a single task by id (exclude soft-deleted)
router.get('/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid task id' });

    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Soft-delete a task (set deleted_at = NOW())
router.delete('/:id', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid task id' });

    // Attempt to soft-delete only if not already deleted
    const [result] = await db.query('UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL', [id]);
    if (result.affectedRows === 1) {
      return res.json({ success: true, message: 'Task soft-deleted' });
    }

    // If nothing changed, determine reason
    const [rows] = await db.query('SELECT deleted_at FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    if (rows[0].deleted_at) return res.status(400).json({ error: 'Task already deleted' });

    res.status(500).json({ error: 'Unable to delete task' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Restore a soft-deleted task (set deleted_at = NULL)
router.put('/:id/restore', async (req, res) => {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid task id' });

    const [result] = await db.query('UPDATE tasks SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL', [id]);
    if (result.affectedRows === 1) return res.json({ success: true, message: 'Task restored' });

    // Determine reason
    const [rows] = await db.query('SELECT deleted_at FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    if (!rows[0].deleted_at) return res.status(400).json({ error: 'Task is not deleted' });

    res.status(500).json({ error: 'Unable to restore task' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;