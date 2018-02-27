import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import data from './data.json'
import GuidelinesActions from '../actions/guidelinesActions'
import GuidelinesStore from "../stores/guidelinesStore.js";

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6' +
    'tFX7QHmA';

const options = [
  {
    name: 'Population',
    description: 'Estimated total population',
    property: 'pop_est',
    stops: [
      [
        0, '#f8d5cc'
      ],
      [
        1000000, '#f4bfb6'
      ],
      [
        5000000, '#f1a8a5'
      ],
      [
        10000000, '#ee8f9a'
      ],
      [
        50000000, '#ec739b'
      ],
      [
        100000000, '#dd5ca8'
      ],
      [
        250000000, '#c44cc0'
      ],
      [
        500000000, '#9f43d7'
      ],
      [1000000000, '#6e40e6']
    ]
  }, {
    name: 'GDP',
    description: 'Estimate total GDP in millions of dollars',
    property: 'gdp_md_est',
    stops: [
      [
        0, '#f8d5cc'
      ],
      [
        1000, '#f4bfb6'
      ],
      [
        5000, '#f1a8a5'
      ],
      [
        10000, '#ee8f9a'
      ],
      [
        50000, '#ec739b'
      ],
      [
        100000, '#dd5ca8'
      ],
      [
        250000, '#c44cc0'
      ],
      [
        5000000, '#9f43d7'
      ],
      [10000000, '#6e40e6']
    ]
  }
]

const storeConnector = {
  GuidelinesStore(Store) {
    return {
      guidelines: Store.getGuidelines(),
      isFetching: Store.getFetchingStatus(),
      error: Store.getError()
    };
  }
};

class MapBoxComponent extends React.Component {
  map;

  constructor(props) {
    super(props);
    this.state = {
      active: options[0],
      countries: {}
    };
  }



  componentDidUpdate() {
console.log('update')
this.map.on('load',()=>{
    this.map.addLayer({
      'id': 'maine',
      'type': 'fill',
      'source': {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'geometry': JSON.parse(this.state.countries[0].geom)
          }
      },
      'layout': {},
      'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
      }
  });
});


  }

  componentDidMount() {

console.log('mount')

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [
        5, 34
      ],
      zoom: 1.5
    });

    console.log('COMPONENT HAS MOUNTED')
    fetch('http://localhost:3000/api/countries').then(res => {
      res
        .json()
        .then(data => {
          console.log(data)
          this.setState({countries: data})          
        })
    })


    

    this.map
      .on('load', () => {

        // Add source for admin-0 enterprise boundaries
        this
          .map
          .addSource('admin-0', {
            type: 'vector',
            url: 'mapbox://mapbox.enterprise-boundaries-a0-v1'
          });
        // Add a layer with boundary lines
        console.log(this.map)
        this
          .map
          .addLayer({
            id: 'admin-0-line',
            type: 'line',
            source: 'admin-0',
            'source-layer': 'boundaries_admin_0',
            paint: {
              'line-color': 'red'
              
            }
          }, 'waterway-label');
      });

  }

  setFill() {
    const {property, stops} = this.state.active;
    this
      .map
      .setPaintProperty('countries', 'fill-color', {property, stops});
  }

  render() {
    console.log(this.state.countries[0])
    const {name, description, stops, property} = this.state.active;
    const renderLegendKeys = (stop, i) => {
      return (
        <div key={i} className='txt-s'>
          <span
            className='mr6 round-full w12 h12 inline-block align-middle'
            style={{
            backgroundColor: stop[1]
          }}/>
          <span>{`${stop[0].toLocaleString()}`}</span>
        </div>
      );
    }

    const renderOptions = (option, i) => {
      return (
        <label key={i} className="toggle-container">
          <input
            onChange={() => this.setState({active: options[i]})}
            checked={option.property === property}
            name="toggle"
            type="radio"/>
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    }

    return (
      <div>
        <div
          ref={el => this.mapContainer = el}
          className="absolute top right left bottom"/>
        <div
          className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
          {options.map(renderOptions)}
        </div>
        <div
          className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180">
          <div className='mb6'>
            <h2 className="txt-bold txt-s block">{name}</h2>
            <p className='txt-s color-gray'>{description}</p>
          </div>
          {stops.map(renderLegendKeys)}
        </div>
      </div>
    );
  }
}

export default MapBoxComponent

