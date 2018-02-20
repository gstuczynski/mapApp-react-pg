import React from 'react';
import './App.css';
import Map from './MapContainer';
import './styles/style.css';
import Graphs from './Graphs'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <Route path="/graphs" component={Graphs}/>
        <Route path="/map" component={Map}/>
      </div>
    </Router>
  </div>
)

export default App;