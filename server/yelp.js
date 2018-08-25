const yelp = require('yelp-fusion');
const apiKey = require('../yelp_api.js');

const client = yelp.client(apiKey);

const searchAll = (/*coords*/) => {
  client.search({
    location: 'san francisco, ca'
    // location: coords
  }).then(res => {
    console.log(res.jsonBody.businesses[0].name);
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  searchAll,
};
