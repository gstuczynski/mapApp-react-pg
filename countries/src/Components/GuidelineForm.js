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
    <form onSubmit={props.onSubmit}>
    <input type="text" name="username" onChange={props.onChangeUsername} value={props.username}/>
    { props.userNameError && <span class="error">{ props.usernameError }</span> }
    <input type="password" name="password" onChange={props.onChangePassword} value={props.password}/>
    { props.passwordError && <span class="error">{ props.passwordError }</span> }
    <input type="submit" value="Log in"/>
  </form>
  );
};

GuidelineForm.propTypes = {
  username: React.PropTypes.string.isRequired,
  usernameError: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired,
  passwordError: React.PropTypes.string.isRequired,
  onChangeUsername: React.PropTypes.func.isRequired,
  onChangePassword: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default GuidelineForm;