import alt from '../alt';

class MapActions {
    constructor(){
        this.generateActions('selectPlace', 'fetchCountriesError', 'fetchCountriesSuccess')
    }

    fetchCountries(){
        return (dispatch) => {
            dispatch();
            fetch('http://localhost:3000/api/countries').then(response => {
                if (!response.ok) {
                    this.fetchCountriesError(response.body);
                } else {
                    response
                    .json()
                    .then(data => {
                        this.fetchCountriesSuccess(data)
                    })
                }
            })
            .catch(error => {
                this.fetchGuidelinesError(error)
            })
        };
    }
}



export default alt.createActions(MapActions);