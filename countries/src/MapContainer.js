/* global google */

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
  KmlLayer
} from "react-google-maps";
import React from 'react';
import _ from 'underscore';
import {Chart} from 'react-google-charts';
import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";
import GuidelinesActions from './actions/guidelinesActions'
import GuidelinesStore from "./stores/guidelinesStore.js";
import MapStore from "./stores/mapStore";
import MapActions from "./actions/mapActions";

import connectToStores from './connectToStores';
import ReactLoading from 'react-loading';

const renderGuidelineMarker = (g) => {
  return (<Marker key={g.id} position={g.coords} />)
}

const renderTemporaryMarker = (coords) => {
  return (<Marker position={coords} label='tmp'/>)
}

const renderHeatmap = (gs) => {
  /* let data = [];
  gs.forEach( g => {
    data.push(new google.maps.LatLng(g.coords.lat, g.coords.lng))
  });
  console.log(data);
  return(<HeatmapLayer data = {data} />)*/
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

class MapBoxTest extends React.Component {

  constructor() {
    super();
    this.state = {
      title: 'Countries',
      center: {},
      mode: 'markers'
    }
  }

  componentDidMount() {
    GuidelinesActions.fetchGuidelines();
  }

  onMapClick(event) {

    //console.log(event)
    MapActions.selectPlace({
      'lat': event
        .latLng
        .lat(),
      'lng': event
        .latLng
        .lng()
    });
    /*  this.setState({
      selectedPlace: {
        'lat': event
          .latLng
          .lat(),
        'lng': event
          .latLng
          .lng()
      }
    })*/
  }

  render() {
    const {mode} = this.state;
    const {guidelines, isFetching, error, selectedPlace} = this.props;
    console.log(selectedPlace)
    if (!isFetching && !error) {
      return (
        <div>
          <button>Heatmap</button>
          <GoogleMapsWrapper
            loadingElement={< div style = {{ height: `100%` }}/>}
            containerElement={< div style = {{ height: `400px` }}/>}
            mapElement={< div style = {{ height: `100%` }}/>}
            defaultZoom={8}
            defaultCenter={{
            lat: -33.49,
            lng: 151.934
          }}
            onClick={this
            .onMapClick
            .bind(this)}>
            {mode === 'markers' && guidelines.map(renderGuidelineMarker)}
            {mode === 'heatmap' && renderHeatmap(guidelines)}
            {selectedPlace && renderTemporaryMarker(selectedPlace)}
            {/*renderHeatmap(guidelines)*/}
          </GoogleMapsWrapper>
        </div>
      );
    } else if (error) {
      return (
        <div>{error.message}</div>
      )
    } else {
      return (<ReactLoading type='spinningBubbles' color='#800000' height={200} width={200}/>)
    }
  }
}

export default connectToStores(Map, [
  GuidelinesStore, MapStore
], storeConnector);
