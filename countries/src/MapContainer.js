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
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const parseCoordinate = ([x, y]) => {
  return { lat: x, lng: y }
};



const countryMapper = ({ name, geom: { coordinates } }) => {
  if (!_.isArray(coordinates[0][0][0])) {
    return <SinglePolygonCountry coordinates={coordinates[0]} key={name} />
  } else {
    return <MultiPolygonCountry arrOfCoordinates={coordinates[0]} key={name} />
  }
}

const SinglePolygonCountry = ({ coordinates }) => (
  <Polygon path={coordinates.map(parseCoordinate)} />
);

const MultiPolygonCountry = ({ arrOfCoordinates }) => (
  <Polygon paths={arrOfCoordinates.map(coordinates => coordinates.map(parseCoordinate))} />
)

const MapWithAMarker = withScriptjs(withGoogleMap(props => {
  var options = {
    //region: '002', // Africa
    colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
    backgroundColor: '#81d4fa',
    datalessRegionColor: '#f8bbd0',
    defaultColor: '#f5f5f5',
  };

  var data = [
    ['Country',   'Latitude'],
    ['Poland', 36], ['Italy', 6], ['France', 3], ['dupa', 2], ['CHUJ', 8]
  ];


  var options2 = {
    region: 'IT',
    displayMode: 'markers',
    colorAxis: {colors: ['green', 'blue']}
  };

  var data2 = [
    ['City',   'Population', 'Area'],
    ['Rome',      2761477,    1285.31],
    ['Milan',     1324110,    181.76],
    ['Naples',    959574,     117.27],
    ['Turin',     907563,     130.17],
    ['Palermo',   655875,     158.9],
    ['Genoa',     607906,     243.60],
    ['Bologna',   380181,     140.7],
    ['Florence',  371282,     102.41],
    ['Fiumicino', 67370,      213.44],
    ['Anzio',     52192,      43.43],
    ['Ciampino',  38262,      11]
  ];

  const renderMarkers = (g) => {
    console.log(g)
    return (
    <Marker key={g.id} position={ g.coords }/>
)}

  return (
    
    <div>
          {props.guidelines.map(renderMarkers)}
        <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -33.49, lng: 151.934 }}
    onClick={props.onClick}
  >
  </GoogleMap>
  <div className={'my-pretty-chart-container'}>
        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          width="100%"
          height="400px"
          legend_toggle
        />
        <Chart
          chartType="GeoChart"
          data={data2}
          options={options2}
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
  </div>
  );
}));

export default MapWithAMarker;