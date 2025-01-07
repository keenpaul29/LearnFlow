const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for a user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

// Update a task
router.patch('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Get task statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ userId: req.user.userId });
    const completedTasks = await Task.countDocuments({
      userId: req.user.userId,
      status: 'completed'
    });
    const inProgressTasks = await Task.countDocuments({
      userId: req.user.userId,
      status: 'in-progress'
    });
    
    const categoryStats = await Task.aggregate([
      { $match: { userId: req.user.userId } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      byCategory: categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router;
