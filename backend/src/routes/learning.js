const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const { google } = require('googleapis');
const axios = require('axios');

// AI Service configuration
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8001';

// Google Calendar API configuration
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Get learning recommendations
router.get('/recommendations', auth, async (req, res) => {
    try {
        const response = await axios.get(`${AI_SERVICE_URL}/recommendations/${req.user.userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recommendations' });
    }
});

// Get learning analytics
router.get('/analytics', auth, async (req, res) => {
    try {
        const response = await axios.get(`${AI_SERVICE_URL}/analytics/${req.user.userId}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics' });
    }
});

// Generate learning path
router.post('/generate-path', auth, async (req, res) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/generate-learning-path`, {
            ...req.body,
            userId: req.user.userId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error generating learning path' });
    }
});

// Update learning progress
router.post('/progress', auth, async (req, res) => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/update-progress`, {
            ...req.body,
            userId: req.user.userId
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress' });
    }
});

// Sync with Google Calendar
router.post('/sync-calendar', auth, async (req, res) => {
    try {
        const { taskId } = req.body;
        const task = await Task.findById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Set credentials from user's stored token
        oauth2Client.setCredentials({
            access_token: req.user.googleToken
        });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        
        // Create calendar event
        const event = {
            summary: task.title,
            description: task.description,
            start: {
                dateTime: task.dueDate,
                timeZone: 'UTC',
            },
            end: {
                dateTime: new Date(new Date(task.dueDate).getTime() + 60*60*1000), // 1 hour duration
                timeZone: 'UTC',
            },
        };

        const calendarEvent = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        // Update task with calendar event ID
        task.calendarEventId = calendarEvent.data.id;
        await task.save();

        res.json({ message: 'Task synced with calendar', eventId: calendarEvent.data.id });
    } catch (error) {
        res.status(500).json({ message: 'Error syncing with calendar' });
    }
});

// Schedule Zoom meeting
router.post('/schedule-meeting', auth, async (req, res) => {
    try {
        const { topic, startTime, duration } = req.body;

        // Create Zoom meeting using Zoom API
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type: 2, // Scheduled meeting
            start_time: startTime,
            duration,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: false,
                mute_upon_entry: true,
                watermark: false,
                use_pmi: false,
                approval_type: 0,
                audio: 'both',
                auto_recording: 'none'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.ZOOM_JWT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error scheduling Zoom meeting' });
    }
});

// Fetch course data from LMS
router.get('/courses/:platform', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        let courseData;

        switch (platform) {
            case 'moodle':
                courseData = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
                    params: {
                        wstoken: process.env.MOODLE_TOKEN,
                        wsfunction: 'core_course_get_courses',
                        moodlewsrestformat: 'json'
                    }
                });
                break;

            case 'coursera':
                courseData = await axios.get('https://api.coursera.org/api/courses.v1', {
                    headers: {
                        'Authorization': `Bearer ${process.env.COURSERA_API_KEY}`
                    }
                });
                break;

            default:
                return res.status(400).json({ message: 'Unsupported platform' });
        }

        res.json(courseData.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course data' });
    }
});

module.exports = router;
