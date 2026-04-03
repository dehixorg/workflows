require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy route to n8n
app.post('/api/create-meeting', async (req, res) => {
    const { topic } = req.body;
    
    if (!topic) {
        return res.status(400).json({ error: 'Meeting topic is required' });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!n8nWebhookUrl) {
        console.error("Missing N8N_WEBHOOK_URL environment variable.");
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        console.log(`Forwarding request to n8n for topic: "${topic}"`);
        // Forward request to n8n webhook
        const response = await axios.post(n8nWebhookUrl, { topic });
        
        // We expect n8n to return JSON like { meetingUrl: "https://meet.google.com/..." }
        const meetingUrl = response.data?.meetingUrl;
        
        if (meetingUrl) {
            res.json({ meetingUrl });
        } else {
            console.error('n8n response did not include meetingUrl:', response.data);
            res.status(502).json({ error: 'Invalid response from workflow automation.' });
        }
    } catch (error) {
        console.error('Error triggering n8n:', error.message);
        res.status(500).json({ error: 'Failed to generate meeting link via n8n.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});