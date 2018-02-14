import React, {Component} from 'react';
import './App.css';
import MapWithAMarker from './MapContainer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Countries',
      countries: []
    }
  }

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
    fetch('http://localhost:3000/api/countries').then(res => {
      res
        .json()
        .then(data => {
          this.setState({countries: data})
        })
    })
  }

  onMapClick(event){
    console.log(event.latLng.lat())
    this.setState({selectedPlace: {'lat': event.latLng.lat(), 'lng': event.latLng.lng()}})
  }

  addGuideline(event){
    event.preventDefault();
    console.log(this.state)
    let guideline_data = {
      guideline_name: this.refs.guideline_name.value, 
      guideline_city: this.refs.guideline_city.value,
      coords: this.state.selectedPlace
    }
    var request = new Request('http://localhost:3000/api/add-guideline', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(guideline_data)
    });
    fetch(request).then((response) => {
      response
        .json()
        .then((data) => {
          let countries = this.state.countries;
          countries.push(guideline_data);
          console.log(countries)
          this.setState({countries: countries})
        })
        .catch(function (err) {
          console.log(err)
        })
    })
  }

  render() {
    const {title, countries} = this.state;
    return (
      <div className="App">
        {title}
        <form>
          Guideline Name
          <input type="text" ref="guideline_name"/>
          City
          <input type="text" ref="guideline_city"/>
          <button onClick={this.addGuideline.bind(this)}>Add Guideline</button>
        </form>
        <MapWithAMarker
          countries={countries}
          onClick={this.onMapClick.bind(this)}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJV7-fNmWFhS7e84lxTpqlw-4xNrHTUSo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={< div style = {{ height: `100%` }}/>}
          containerElement={< div style = {{ height: `400px` }}/>}
          mapElement={< div style = {{ height: `100%` }}/>}/>
      </div>
    );
  }
}

export default App;