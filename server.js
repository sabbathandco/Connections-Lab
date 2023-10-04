require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.listen(port, () => console.log(`Server running on port ${port}`));

app.post('/chatbot', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const config = {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  };
  const messages = req.body.messages;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: messages
  }, config);
  res.json(response.data);
});

// If no route matches, send the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});