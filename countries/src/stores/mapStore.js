import alt from '../alt';
import MapActions from '../actions/mapActions'

class MapStore {
    constructor() {
        this.state = {
            selectedPlace: {}
        };
        this.bindActions(MapActions);    //chce wszystkie, jak tylko wybrane to bind
        this.exportPublicMethods({
          getSelectedPlace: this.getSelectedPlace,
        });
    }

    onSelectPlace(place){
        this.setState({ selectedPlace: place });
        //console.log(this.state)
    }

    getSelectedPlace() {
        return this.state.selectedPlace
    }

}

export default alt.createStore(MapStore, 'MapStore');