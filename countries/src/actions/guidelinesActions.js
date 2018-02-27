import alt from '../alt';

class GuidelinesActions {
    constructor(){
        this.generateActions('fetchGuidelinesSuccess', 'fetchGuidelinesError', 'addGuidelinesSuccess', 'addGuidelinesError')
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

    addGuideline(guideline){
        return (dispatch) => {
            dispatch();
            var request = new Request('http://localhost:3000/api/add-guideline', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(guideline)
              });
              fetch(request).then(response => {
                response
                  .json()
                  .then(data => {
                    this.addGuidelinesSuccess(data)
                  })
                  .catch(error => {
                    this.addGuidelinesError(error)
                })
              })
        }
    }
}

export default alt.createActions(GuidelinesActions);