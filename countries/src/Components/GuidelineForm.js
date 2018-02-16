import React from 'react';

const addGuideline = (event) => {
  event.preventDefault();
  let guideline_data = {
    guideline_name: this.refs.guideline_name.value
  }
  var request = new Request('http://localhost:3000/api/add-guideline', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(guideline_data)
  });

  fetch(request).then((response) => {
    response
      .json()
      .then((data) => {
        let countries = this.state.countries;
        countries.push(guideline_data);
        console.log(countries)
        this.setState({countries: countries})
      })
      .catch(function (err) {
        console.log(err)
      })
  })
}




const GuidelineForm = props => {
  return (
    <form>
    Guideline Name <input type="text" ref="guideline_name"/>
    City <input type="text"/>

    <button >Add Guideline</button>
    </form>
  );
};

export default GuidelineForm;