const express = require('express');
const path = require('path');

// Create server 
const app = express();

// Logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Server static assets
app.use('/', express.static(path.join(__dirname, '../public')));

// Middleware
app.get('/location', (req, res) => {

})

// Define port number
const port = 8080;

// Start server
app.listen(port, () => console.log(`Listening on ${port} ...`));
