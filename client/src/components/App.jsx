const React = require('react');
const axios = require('axios');

import Gallery from './Gallery.jsx';
import Details from './Details.jsx';

require('../styles/app.css');

class App extends React.Component {
  constructor() {
    super();
    this.state ={
      latitude: 0,
      longitude: 0,
      showInfo: false,
      restaurant: { 
        photos: [],
        location: {address1: ''}
      },
    }
    this.handleRandomizerClick = this.handleRandomizerClick.bind(this);
  }

  componentDidMount() {
    // obtain user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('Coordinates', pos.coords);
        this.setState({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    } else {
      console.log('geolocation is not supported');
    }
  }

  handleRandomizerClick() {
    axios.get('/location', {
      params: {
        'lat': this.state.latitude,
        'long': this.state.longitude,
      }
    })
    .then((res) => {
      console.log('res', res.data.alias);
      // this.setState({
      //   showInfo: true,
      // })
      axios.get('/business', {
        params: {
          'alias': res.data.alias, 
        }
      })
      .then((response) => {
        console.log('response', response.data);
        this.setState({
          restaurant: response.data,
          showInfo: true,
        })
      })
      .catch((error) => {
        throw error;
      })

    })
    .catch((err) => {
      throw err;
    })

  }

  render() {
    return (
      <div>
        {
          this.state.showInfo ? (<Gallery images={this.state.restaurant.photos} />) : <span/>
        }
        {
          this.state.showInfo ? (<Details restaurant={this.state.restaurant} />) : <span/>
        }
        <div className="btn-wrapper">
          <button className="randomizer-btn" onClick={this.handleRandomizerClick}>Pick a restaurant</button>
        </div>
      </div>
    )
  }
}

export default App;