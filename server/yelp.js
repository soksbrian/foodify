const yelp = require('yelp-fusion');
const apiKey = require('../yelp_api.js');

const lim = 40;

const client = yelp.client(apiKey);

const searchAll = (lat, long, response) => {
  client.search({
    latitude: lat,
    longitude: long,
    radius: 400,
    limit: lim,
    price: '1, 2',
    open_now: true,
  }).then(data => {
    console.log('searchAll success');
    response.send(data.jsonBody.businesses[Math.floor(Math.random() * Math.floor(lim))]);
  }).catch(err => {
    console.log(err);
    response.status(500);
  });
}

const searchOne = (alias, response) => {
  client.business(alias).then(data => {
    console.log('searchOne', data.jsonBody);
    response.send(data.jsonBody);
  }).catch(err => {
    console.log(err);
    response.status(500);
  });
}

module.exports = {
  searchAll,
  searchOne,
};
