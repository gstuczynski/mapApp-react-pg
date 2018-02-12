import React, {Component} from 'react';
import './App.css';

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
    var that = this;
    fetch('http://localhost:3000/api/countries').then(function (res) {
      res
        .json()
        .then(function (data) {
          that.setState({
            countries:data
          })
        })
    })

  }

  addCountry(event) {
    var that = this;
    event.preventDefault();
    let country_data = {
      country_name: this.refs.country_name.value
    }
    var request = new Request('http://localhost:3000/api/new-country', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(country_data)
    });

    fetch(request).then(function (response) {
      response
        .json()
        .then(function (data) {
          let countries = that.state.countries;
          countries.push(country_data);
          console.log(countries)
          that.setState({countries: countries})
        })
        .catch(function (err) {
          console.log(err)
        })
    })
  }

  render() {
    const {title, countries} = this.state;
    console.log(countries)
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
      </div>
    );
  }
}

export default App;
