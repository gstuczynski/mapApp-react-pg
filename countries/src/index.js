import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import MapContainer from './MapContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
<App />
</div>
    , document.getElementById('root'));
registerServiceWorker();
