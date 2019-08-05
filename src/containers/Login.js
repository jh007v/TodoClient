import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions } from '../actions';
import { ActionTypes } from '../contants';
import './Login.css';

const loginAsync = (username, password) => (dispatch) => {
  return dispatch(Actions.login(username, password))
    .then(response => {
      if (response.type === ActionTypes.LOGIN_SUCCESS) {
        return dispatch(Actions.getUserMe())
      } else {
        return Promise.reject(response);
      }
    })
    .then(response => {
      if (response.type === ActionTypes.GET_USERME_SUCCESS) {
        return dispatch(Actions.fetchTodo());
      } else {
        return Promise.reject(response);
      }
    });
}

const Login = ({ history, login }) => {
  let usernameInput, passwordInput;
  const onSubmit = (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    login(username, password)
      .then(response => {
        history.push("/");
      })
      .catch(error => {
        console.log('error >> ', error);
      });
  };

  const onSignup = (e) => {
    e.preventDefault();
    history.push("/signup")
  }

  return (
    <div className="Login">
      <div className="LoginForm">
        <div className="header">
          To-Do Service
        </div>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-4 col-form-label">Username</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" ref={element => usernameInput = element} id="username" name="username" placeholder="Username" />
              <small className="form-text text-muted" id="usernameHelper" name="usernameHelper">
              </small>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
            <div className="col-sm-8">
              <input type="password" className="form-control" ref={element => passwordInput = element} id="password" name="password" placeholder="Password" />
              <small className="form-text text-muted" id="passwordHelper" name="passwordHelper">
              </small>
            </div>
          </div>
          <div>
            <button className="btn btn-primary mb-3" type="submit" id="submit" name="submit">Log In</button>
            <button className="btn btn-secondary" type="button" id="signup" name="signup" onClick={(e) => onSignup(e)}>Sign up</button>
          </div>
        </form>
        <div className="footer">
          <a href="/forgotPassword">Foggot Password?</a>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(loginAsync(username, password))
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
