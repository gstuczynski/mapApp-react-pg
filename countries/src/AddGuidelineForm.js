import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import MapStore from "./stores/mapStore";
import MapActions from "./actions/mapActions";
import connectToStores from './connectToStores';
import GuidelinesActions from './actions/guidelinesActions'
import GuidelinesStore from "./stores/guidelinesStore.js";

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
      selectedPlace: Store.getSelectedPlace(),
      selectedIsoA2: Store.getSelectedIsoA2()
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
        let guideline = {
          guideline_name: guideline_name,
          iso_a2: this.props.selectedIsoA2,
          coords: {
            'lat': latLng.lat,
            'lng': latLng.lng
          }
        }
        GuidelinesActions.addGuideline(guideline)
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
    console.log('isoo',this.props.selectedIsoA2)

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