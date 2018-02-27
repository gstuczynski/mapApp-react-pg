import alt from '../alt';

class MapActions {
    constructor(){
        this.generateActions('selectPlace', 'fetchCountriesError', 'fetchCountriesSuccess', 'selectIsoA2')
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
                this.fetchCountriesError(error)
            })
        };
    }
}



export default alt.createActions(MapActions);