import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from '../actions';
import { ActionTypes } from '../contants';
import './Signup.css';

const signupAsync = ({ username, password, email, firstName, lastName }) => (dispatch) => {
  return dispatch(Actions.getClientToken())
    .then(response => {
      if (response.type === ActionTypes.GET_TOKEN_SUCCESS) {
        return dispatch(Actions.signup({ username, password, email, firstName, lastName }))
      } else {
        return Promise.reject(response);
      }
    });
};

const Signup = ({ history, signup }) => {
  let usernameInput, passwordInput, emailInput;
  let firstNameInput, lastNameInput;
  const onSubmit = (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    signup({ username, password, email, firstName, lastName })
      .then(response => {
        if (response.type === ActionTypes.SIGNUP_SUCCESS) {
          history.push('/login');
        } else {
          const { error } = response;
          return Promise.reject(error);
        }
      })
      .catch(error => {
        console.log("error >>", error);
      });
  }

  return (
    <div className="Signup">
      <div className="SignupForm">
        <div className="header">
          To-Do Service
        </div>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-4 col-form-label">Username</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={element => usernameInput = element} id="username" name="username" placeholder="Username" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" ref={element => passwordInput = element} id="password" name="password" placeholder="Password" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="firstName" className="col-sm-4 col-form-label">First Name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={element => firstNameInput = element} id="firstName" name="firstName" placeholder="First Name" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-sm-4 col-form-label">Last Name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={element => lastNameInput = element} id="lastName" name="lastName" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
            <div className="col-sm-8">
              <input type="email" className="form-control" ref={element => emailInput = element} id="email" name="email" placeholder="Email" />
            </div>
          </div>
          <div>
            <button className="btn btn-primary" type="submit" id="submit" name="submit">Sign Up</button>
          </div>
        </form>
        <div className="footer">
          <a href="/login">Already have account?</a>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signup: (username, password, email, firstName, lastName) => dispatch(signupAsync(username, password, email, firstName, lastName))
});

export default withRouter(connect(null, mapDispatchToProps)(Signup));
