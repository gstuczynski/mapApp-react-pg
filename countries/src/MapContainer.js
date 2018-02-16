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
import { Chart } from 'react-google-charts';
import SearchPlace from './SearchPlace'


const MapWithAMarker = withScriptjs(withGoogleMap(props => {

  const renderMarkers = (g) => {
    console.log(g)
    return (
    <Marker key={g.id} position={ g.coords }/>
)}

  return (
    <div>
      <SearchPlace
        renderMarkers = {renderMarkers}
        guidelines={props.guidelines}

      />
      {props.guidelines.map(renderMarkers)}
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -33.49, lng: 151.934 }}
        onClick={props.onClick}
      />
  </div>
  );
}));

export default MapWithAMarker;