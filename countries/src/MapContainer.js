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
import connectToStores from './connectToStores';

const renderMarkers = (g) => {  
  return (<Marker key={g.id} position={g.coords}/>)
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
      guidelines: Store.getGuidelines()
    };
  },
};

class Map extends React.Component {

  constructor() {
    super();
    this.state = {
      title: 'Countries',
      center: {},
      mode: 'markers',
    }
  }

  componentDidMount() {
    GuidelinesActions.fetchGuidelines();
  }

  onMapClick(event){
    console.log(event)
    this.setState({selectedPlace: {'lat': event.latLng.lat(), 'lng': event.latLng.lng()}})
  }

  render() {
    const { mode } = this.state;
    const { guidelines } = this.props;
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
          onClick={this.onMapClick}
        >
          {mode === 'markers' && guidelines.map(renderMarkers)}
          {mode === 'heatmap' && renderHeatmap(guidelines)}
          {/*renderHeatmap(guidelines)*/}
        </GoogleMapsWrapper>
      </div>
    );
  }
}

export default connectToStores(Map, GuidelinesStore, storeConnector);
  