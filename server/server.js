const express = require('express');
const path = require('path');
const yelp = require('./yelp.js');

// Create server 
const app = express();

// Logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Access Control
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// Server static assets
app.use('/', express.static(path.join(__dirname, '../public')));

// Middleware
app.get('/location', (req, res) => {
  yelp.searchAll(req.query.lat, req.query.long, res);
});

app.get('/business', (req, res) => {
  yelp.searchOne(req.query.alias, res);
});

// Define port number
const port = 8080;

// Start server
app.listen(port, () => console.log(`Listening on ${port} ...`));
