const React = require('react');
const axios = require('axios');

import Gallery from './Gallery.jsx';
import Details from './Details.jsx';
import Saved from './Saved.jsx';

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
      topTen: [],
    }
    this.handleRandomizerClick = this.handleRandomizerClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
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
    
    axios
    .get('/saved')
    .then((res) => {
      this.setState({
        topTen: res.data,
      });
    })
    .catch((err) => {
      console.log('error', err);
    })
    
  }

  handleRandomizerClick() {
    axios.get('/location', {
      params: {
        'lat': this.state.latitude,
        'long': this.state.longitude,
      }
    })
    .then((res) => {
      axios.get('/business', {
        params: {
          'alias': res.data.alias, 
        }
      })
      .then((response) => {
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

  handleSaveClick() {
    console.log('click');
    axios
    .post('/fave', {
      alias: this.state.restaurant.alias,
      name: this.state.restaurant.name,
      cuisines: JSON.stringify(this.state.restaurant.categories),
      phone: this.state.restaurant.display_phone,
      address: this.state.restaurant.location.address1,
      price: this.state.restaurant.price,
    })
    .then(((res) => {
      console.log('axios res', res);
      axios
      .get('/saved')
      .then((res) => {
        this.setState({
          topTen: res.data,
        });
      })
      .catch((err) => {
        console.log('error', err);
      })
    }))
    .catch((err) => {
      console.log('axios err', err);
    })
  }

  render() {
    return (
      <div>
        {
          this.state.showInfo ? 
          (
            <div>
              <Gallery images={this.state.restaurant.photos} />
              <Details restaurant={this.state.restaurant} />
              <div className="save-wrapper">
                <button className="save-btn" onClick={this.handleSaveClick}>Save</button>
              </div>
            </div>
          ) : (
            <div className="banner">
              Foodify.io
            </div>
          )
        }
        <div className="randomizer-wrapper">
          <button className="randomizer-btn" onClick={this.handleRandomizerClick}>Pick a restaurant</button>
        </div>
        {
          this.state.showInfo ? <Saved list={this.state.topTen} /> : <span/>
        }
      </div>
    )
  }
}

export default App;