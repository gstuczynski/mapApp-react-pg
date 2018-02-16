import React, {Component} from 'react';
import './App.css';
import MapWithAMarker from './MapContainer';
import './styles/style.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Graphs from './Graphs'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Countries',
      guidelines: [],
      center: {}
      }
  }

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
    fetch('http://localhost:3000/api/get-guidelines').then(res => {
      res
        .json()
        .then(data => {
          this.setState({guidelines: data})
          console.log(data)
        })
    })
  }

  onMapClick(event){
    console.log(event)
    this.setState({selectedPlace: {'lat': event.latLng.lat(), 'lng': event.latLng.lng()}})
  }

  addGuideline(event){
    event.preventDefault();
    let guideline_data = {
      guideline_name: this.refs.guideline_name.value, 
      guideline_city: this.refs.guideline_city.value,
      coords: this.state.selectedPlace
    }

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error))

    var request = new Request('http://localhost:3000/api/add-guideline', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(guideline_data)
    });
    fetch(request).then((response) => {
      response
        .json()
        .then(() => {
          let guidelines = this.state.guidelines;
          guidelines.push(guideline_data);
          this.setState({guidelines: guidelines})
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  render() {
    const {title, guidelines} = this.state;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <div>
        <Router>
          <Route path="/graphs" component={Graphs} />
        </Router>
        <div className="App">
          {title}
          <form onSubmit={this.addGuideline.bind(this)}>
            Guideline Name
            <input type="text" ref="guideline_name"/>
            City
            <input type="text" ref="guideline_city"/>
      {/*     <PlacesAutocomplete inputProps={inputProps} />
            <button type="submit" onClick={this.addGuideline.bind(this)}>Add Guideline</button>*/}
          </form>
          <MapWithAMarker
            guidelines={guidelines}
            center={this.state.center}
            onClick={this.onMapClick.bind(this)}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJV7-fNmWFhS7e84lxTpqlw-4xNrHTUSo&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={< div style = {{ height: `100%` }}/>}
            containerElement={< div style = {{ height: `400px` }}/>}
            mapElement={< div style = {{ height: `100%` }}/>}>
        </MapWithAMarker>
        </div>
      </div>
    );
  }
}

export default App;