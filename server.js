const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Using node-fetch for simplicity
const app = express();

// Set up CORS to allow requests from your frontend
app.use(cors({
    origin: 'https://YOUR_FRONTEND_URL', // IMPORTANT: Replace with your frontend's URL on Render
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// The endpoint that your frontend will call
app.post('/api/send-unban-request', async (req, res) => {
    const { number, email, message, supportEmail } = req.body;

    if (!number || !email || !message || !supportEmail) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // --- This is the key part ---
    // Here we will try to mimic a real submission to the WhatsApp support form.
    // NOTE: WhatsApp's specific submission endpoint is not public. This is a best-effort approach.
    // The most reliable method is to use the mailto: link or redirect, as a direct API
    // submission can be blocked or change without notice.
    // For this example, we'll use a direct email sending approach as the most
    // plausible method for a proxy server.
    
    // We'll simulate a submission by sending a request to a mail sending service.
    // For a real-world application, you would need to integrate with a service like
    // SendGrid, Mailgun, or Nodemailer.
    // Since we don't have a configured mail service, this is a placeholder.
    
    const emailSubject = 'Unban Request';
    const emailBody = `From: ${email}\n\n${message}`;

    try {
        // Here, you would call your email service API
        // Example with a placeholder call:
        // const emailServiceResponse = await fetch('https://api.emailservice.com/send', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         to: supportEmail,
        //         from: 'your-email-address@your-domain.com',
        //         subject: emailSubject,
        //         text: emailBody
        //     })
        // });
        
        // For now, we'll just simulate a successful response.
        console.log(`Simulating successful email submission to ${supportEmail}`);
        
        // This is the response sent back to your frontend
        res.status(200).json({ success: true, message: 'Request submitted successfully.' });
    } catch (error) {
        console.error('Failed to submit request:', error);
        res.status(500).json({ success: false, message: 'Failed to submit request.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
