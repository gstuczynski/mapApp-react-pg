import alt from '../alt';
import MapActions from '../actions/mapActions'

class MapStore {
    constructor() {
        this.state = {
            selectedPlace: {},
            countries: []
        };
        this.bindActions(MapActions);    //chce wszystkie, jak tylko wybrane to bind
        this.exportPublicMethods({
          getSelectedPlace: this.getSelectedPlace,
          getCountries: this.getCountries
        });
    }

    onSelectPlace(place){
        this.setState({ selectedPlace: place });
    }

    getCountries() {
        return this.state.countries
    }

    getSelectedPlace() {
        return this.state.selectedPlace
    }

    onFetchCountriesSuccess(countries) {
        this.setState({
            countries,
            error: null,
        }); //this.setState({ guidelines: _.union(this.state.guidelines, [guideline])})
    }

    onFetchCountriesError(error) {
        this.setState({
            error,
        })
    }


}

export default alt.createStore(MapStore, 'MapStore');