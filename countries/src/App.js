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
    fetch('http://localhost:3000/api/countries')
    .then(res => {
      res
        .json()
        .then(data => {
          this.setState({countries: data})
        })
    })
  }

  addCountry(event) {
    event.preventDefault();
    let country_data = {
      country_name: this.refs.country_name.value
    }
    var request = new Request('http://localhost:3000/api/new-country', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(country_data)
    });

    fetch(request).then((response) => {
      response
        .json()
        .then((data) => {
          let countries = this.state.countries;
          countries.push(country_data);
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
          <input type="text" ref="country_name"/>
          <button onClick={this
            .addCountry
            .bind(this)}>Add Country</button>
          <pre>{JSON.stringify(countries)}</pre>
        </form>
        <MapWithAMarker
          countries={countries}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJV7-fNmWFhS7e84lxTpqlw-4xNrHTUSo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;