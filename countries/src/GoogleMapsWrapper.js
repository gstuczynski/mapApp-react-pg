import React from 'react';
import { GoogleMap, withGoogleMap } from 'react-google-maps';
import AddGuidelineForm from './AddGuidelineForm';

const GoogleMapsWrapper = withGoogleMap(props => {
  return (
    <div>
      <AddGuidelineForm />
      <GoogleMap {...props} />
    </div>
  );
});

export default GoogleMapsWrapper;