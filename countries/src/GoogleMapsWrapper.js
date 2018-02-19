/* global google */
import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import AddGuidelineForm from './AddGuidelineForm';
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

const GoogleMapsWrapper = withGoogleMap(props => {
  return (
    <div>
      <AddGuidelineForm />
      <GoogleMap {...props} />
    </div>
  );
});

export default GoogleMapsWrapper;