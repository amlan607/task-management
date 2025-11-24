-- Migration: Add deleted_at column for soft-delete
-- Run this SQL against your `taskdb` database (e.g., via mysql client)

ALTER TABLE tasks
  ADD COLUMN deleted_at TIMESTAMP NULL AFTER created_at;

-- Optionally add an index to speed up queries filtering by deleted_at
CREATE INDEX idx_tasks_deleted_at ON tasks (deleted_at);
