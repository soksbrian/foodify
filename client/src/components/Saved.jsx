const React = require('react');
require('../styles/saved.css');

const Saved = ({ list }) => (
  <div>
    {
      list.map((item, idx) => {
        return (
          <div key={idx} className="entry-wrapper">
            <div>Name: {item.name}</div>
            <div>Cuisines: {item.cuisines}</div>
            <div>Phone: {item.phone}</div>
            <div>Address: {item.address}</div>
            <div>Price: {item.price}</div>
          </div>
        );
      })
    }
  </div>
);

export default Saved;
