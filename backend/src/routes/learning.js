const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const axios = require('axios');

// Get user's learning tasks
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id, type: 'learning' });
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching learning tasks:', error);
        res.status(500).json({ message: 'Error fetching learning tasks' });
    }
});

// Create a learning task
router.post('/tasks', auth, async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = new Task({
            userId: req.user.id,
            title,
            description,
            dueDate,
            priority,
            type: 'learning'
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating learning task:', error);
        res.status(500).json({ message: 'Error creating learning task' });
    }
});

// Update learning task status
router.patch('/tasks/:taskId', auth, async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status, progress } = req.body;
        const task = await Task.findOneAndUpdate(
            { _id: taskId, userId: req.user.id },
            { status, progress },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error updating learning task:', error);
        res.status(500).json({ message: 'Error updating learning task' });
    }
});

// Delete a learning task
router.delete('/tasks/:taskId', auth, async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting learning task:', error);
        res.status(500).json({ message: 'Error deleting learning task' });
    }
});

module.exports = router;
