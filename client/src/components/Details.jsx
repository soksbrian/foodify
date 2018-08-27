const React = require('react');
require('../styles/details.css');

const Details = ({ restaurant }) => (
  <div className="details-column">
    <div className="details-wrapper"> 
      <div>Name: {restaurant.name}</div>
      <div>Phone: {restaurant.display_phone}</div>
      <div>Address: {restaurant.location.address1}</div>
      <div>Price: {restaurant.price}</div>
      <div>Rating: {restaurant.rating}</div>
      <div>Reviews: {restaurant.review_count}</div> 
    </div>
  </div>
);

export default Details;
