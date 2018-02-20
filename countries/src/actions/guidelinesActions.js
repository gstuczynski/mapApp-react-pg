import alt from '../alt';

class GuidelinesActions {
    constructor(){
        this.generateActions('fetchGuidelinesSuccess', 'fetchGuidelinesError')
    }

    fetchGuidelines(){
        return (dispatch) => {
            dispatch();
            fetch('http://localhost:3000/api/get-guidelines').then(response => {
                if (!response.ok) {
                    this.fetchGuidelinesError(response.body);
                } else {
                    response
                    .json()
                    .then(data => {
                        this.fetchGuidelinesSuccess(data)
                    })
                }
            })
            .catch(error => {
                this.fetchGuidelinesError(error)
            })
        };
    }
}

export default alt.createActions(GuidelinesActions);