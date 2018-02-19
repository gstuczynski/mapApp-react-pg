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


const renderMarkers = (g) => {
  return (<Marker key={g.id} position={g.coords}/>)
}

const renderHeatmap = (gs) => {
  let data = [];
  gs.forEach( g => {
    data.push(new google.maps.LatLng(g.coords.lat, g.coords.lng))
  });
  console.log(data);
  return(<HeatmapLayer data = {data} />)
}

class Map extends React.Component {

  constructor() {
    super();
    this.state = {
      title: 'Countries',
      guidelines: [],
      center: {},
      mode: 'heatmap',
    }
  }

  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
    fetch('http://localhost:3000/api/get-guidelines').then(res => {
      res
        .json()
        .then(data => {
          console.log(data)
          this.setState({guidelines: data})
        })
    })
  }

  onMapClick(event){
    console.log(event)
    this.setState({selectedPlace: {'lat': event.latLng.lat(), 'lng': event.latLng.lng()}})
  }

  render() {
    const { mode, guidelines } = this.state;
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
}
{//renderHeatmap(guidelines)
}
        </GoogleMapsWrapper>
      </div>
    );
  }
}
export default Map;