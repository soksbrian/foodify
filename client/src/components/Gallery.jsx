const React = require('react');
require('../styles/gallery.css');

const Gallery = ({ images }) => (
  <div>
    <div className="div-wrapper">
      {
        images.map((image) => {
          return <li className="li-wrapper" key={image} ><img src={image}/></li>
        })
      }
    </div>
  </div>
);

export default Gallery;
