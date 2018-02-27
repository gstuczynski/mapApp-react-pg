import alt from '../alt';
import MapActions from '../actions/mapActions'

class MapStore {
    constructor() {
        this.state = {
            selectedPlace: {},
            selectedIsoA2: '',
            countries: []
        };
        this.bindActions(MapActions);    //chce wszystkie, jak tylko wybrane to bind
        this.exportPublicMethods({
          getSelectedPlace: this.getSelectedPlace,
          getCountries: this.getCountries,
          getSelectedIsoA2: this.getSelectedIsoA2
        });
    }

    onSelectPlace(place){
        this.setState({ selectedPlace: place });
    }

    onSelectIsoA2(code){
        this.setState({ selectedIsoA2: code });
    }

    getCountries() {
        return this.state.countries
    }

    getSelectedPlace() {
        return this.state.selectedPlace
    }

    getSelectedIsoA2() {
        return this.state.selectedIsoA2 
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