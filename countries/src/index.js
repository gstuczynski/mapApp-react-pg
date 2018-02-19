import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import './index.css';
import App from './App';
//import MapContainer from './MapContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>
, document.getElementById('root'));
registerServiceWorker();
