const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load from .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

app.post('/run-test', async (req, res) => {
  console.log('stigao request')
  const { link } = req.body;

  console.log(link)

  if (!link) return res.status(400).json({ error: 'Missing Webflow link' });

  try {
    await axios.post(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/dispatches`,
      {
        event_type: 'run-playwright',
        client_payload: { link }
      },
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${GITHUB_TOKEN}`
        }
      }
    );

    res.json({ message: '✅ GitHub Action triggered successfully!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: '❌ Failed to trigger GitHub Action' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});