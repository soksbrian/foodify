const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const yelp = require('./yelp.js');
const db = require('../database/mongoose.js');

// Create server 
const app = express();

// Handle incoming json
app.use(bodyParser.json());

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

app.post('/fave', (req, res) => {
  db.addFave(req.body, res);
});

app.get('/saved', (req, res) => {
  db.getFaves((err, documents) => {
    if (err) {
      res.status(500).send('get Faves faield');
      return;
    }
    for (let i = 0; i < documents.length; i++) {
      let str = '';
      let list = JSON.parse(documents[i].cuisines);
      list.forEach((obj) => {
        str += obj["title"] + ', ';
      })
      documents[i].cuisines = str.slice(0, str.length - 2);
    }

    res.send(documents);
  });
})

// Define port number
const port = 8080;

// Start server
app.listen(port, () => console.log(`Listening on ${port} ...`));
