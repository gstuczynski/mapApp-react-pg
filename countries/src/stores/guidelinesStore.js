import alt from '../alt';
import GuidelinesActions from '../actions/guidelinesActions'

class GuidelinesStore {
    constructor() {
        this.state = {
            guidelines: [],
            isFetching: false,
            error: null,
        };
        this.bindActions(GuidelinesActions);    //chce wszystkie, jak tylko wybrane to bind
        this.exportPublicMethods({
          getGuidelines: this.getGuidelines,
          getFetchingStatus: this.getFetchingStatus,
          getError: this.getError
        });
    }

    onFetchGuidelines(){
        this.setState({ isFetching: true });
    }

    onFetchGuidelinesSuccess(guidelines) {
        this.setState({
            isFetching: false,
            guidelines,
            error: null,
        }); //this.setState({ guidelines: _.union(this.state.guidelines, [guideline])})
    }

    onFetchGuidelinesError(error) {
        this.setState({
            error,
            isFetching: false,
        })
    }

    getGuidelines() {
        return this.state.guidelines
    }

    getFetchingStatus() {
        return this.state.isFetching;
    }

    getError() {
        return this.state.error;
    }
}

export default alt.createStore(GuidelinesStore, 'GuidelinesStore');