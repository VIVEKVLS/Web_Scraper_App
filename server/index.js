const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Start Python Flask server
const pythonServer = spawn('python', ['app.py'], {
  cwd: path.join(__dirname),
  stdio: 'inherit'
});

// Proxy API requests to Python server
app.use('/api', (req, res) => {
  // Forward the request to the Python Flask server
  const { method, url, body, headers } = req;
  
  // Simple proxy implementation
  const proxyUrl = `http://localhost:5001${url}`;
  
  fetch(proxyUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(error => {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Python Flask server should be running on port 5001');
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  pythonServer.kill();
  process.exit();
}); 