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

const parseCoordinate = ([x, y]) => {
  return {lat: y, lng: x}
};

const getPlaceDetails = (coords) =>{
  console.log('coords',coords)
  const geocoder = new google.maps.Geocoder;
  return new Promise ((resolve, reject) => {
    geocoder.geocode({'location': coords},(res, status) => {
      if (status === 'OK') {
        const country = _.find(res[0].address_components, (addr) =>
          _.some(addr.types, (type) => type === 'country')
        );
        const countryCode = country ? country.short_name : null;
        resolve(countryCode);
      } else {
        reject('Cannot geolocate, bitch!')
      }
    })
  });
}

const onMapClick = (event) => {
  console.log(event)
  let sp = {
    'lat': event
      .latLng
      .lat(),
    'lng': event
      .latLng
      .lng()
  }
  MapActions.selectPlace(sp);
  //console.log('getPlaceDetails',getPlaceDetails(sp))
  getPlaceDetails(sp).then(MapActions.selectIsoA2)
}

const renderCountriesPolygons = (country) => {
  if(JSON.parse(country.geom).type == "Polygon"){
    let path = JSON.parse(country.geom).coordinates[0].map(parseCoordinate)
    return (<Polygon onClick={onMapClick}  path={path} />)
  }else{
    let paths = JSON.parse(country.geom).coordinates.map(coord => coord[0].map(parseCoordinate))
    return (<Polygon onClick={onMapClick} paths={paths} />)
  }
};

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
      selectedPlace: Store.getSelectedPlace(),
      countries: Store.getCountries(),
      selectedIsoA2: Store.getSelectedIsoA2()
    }
  }
};

class Map extends React.Component {

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
    MapActions.fetchCountries();
  }

  render() {
    console.log('mapcont', this.props.selectedIsoA2)
    const {mode} = this.state;
    const {guidelines, isFetching, error, selectedPlace, countries} = this.props;
    if (!isFetching && !error) {
      return (
        <div>
          {countries.map(renderCountriesPolygons)}
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
            onClick={onMapClick}>
            {mode === 'markers' && guidelines.map(renderGuidelineMarker)}
            {mode === 'heatmap' && renderHeatmap(guidelines)}
            {selectedPlace && renderTemporaryMarker(selectedPlace)}
            {countries.map(renderCountriesPolygons)}
            {renderTemporaryMarker({lat: 50.053639384368, lng: 19.956848793594077})}
            
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
