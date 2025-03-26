const express = require("express");
const db = require("../db"); 
const router = express.Router();

// Get all tasks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new task
router.post("/", (req, res) => {
  const { title, description, status } = req.body;
  db.query(
    "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
    [title, description, status || "pending"],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task added", taskId: result.insertId });
    }
  );
});

// Update task status
router.put("/:id", (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Task updated" });
    }
  );
});

// Delete a task
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted" });
  });
});

module.exports = router;
