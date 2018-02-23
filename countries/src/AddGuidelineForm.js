import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import MapStore from "./stores/mapStore";
import MapActions from "./actions/mapActions";
import connectToStores from './connectToStores';

const addGuideline = (guideline) => {
  var request = new Request('http://localhost:3000/api/add-guideline', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(guideline)
  });
  fetch(request).then((response) => {
    response
      .json()
      .then(() => {
        let guidelines = this.state.guidelines;
        guidelines.push(guideline);
        this.setState({guidelines: guidelines})
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

const storeConnector = {
  GuidelinesStore(Store) {
    return {
      guidelines: Store.getGuidelines(),
      isFetching: Store.getFetchingStatus(),
      error: Store.getError()
    };
  },
  MapStore(Store) {
    return {
      selectedPlace: Store.getSelectedPlace()
    }
  }
};

class AddGuidelineForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'San Francisco, CA'
    }
    this.onChange = (address) => this.setState({address})
    this.renderMarkers = this.props.renderMarkers
    this.guidelines = this.props.guidelines
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let guideline_name = this.refs.guideline_name.value
    console.log(this.state.address)

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        let guideline = {
          guideline_name: guideline_name,
          coords: {
            'lat': latLng.lat,
            'lng': latLng.lng
          }
        }
        console.log(guideline)
        addGuideline(guideline)
      })
      .catch(error => console.error('Error', error))
  }

  findPlace = (event) => {
    event.preventDefault()
    geocodeByAddress(this.state.address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      MapActions.selectPlace(latLng)
      console.log('Success', latLng)
    })
    .catch(error => console.error('Error', error))
  
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    return (
      <form onSubmit={this.handleFormSubmit}>
        Guideline Name:
        <input type="text" ref="guideline_name"/>
        <PlacesAutocomplete inputProps={inputProps}/>
        <button onClick={this.findPlace.bind(this)}>Find</button>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default connectToStores(AddGuidelineForm, [
   MapStore
], storeConnector);