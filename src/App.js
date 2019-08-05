import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { Actions } from './actions';
import {
  PrivateRoute
} from './components';
import {
  About,
  Login,
  NotFound,
  Signup,
  Todo
} from './containers';
import { isAuthenticated } from './utils';
import './App.css';

/**
 * App Stateless Component
 * 
 * @param history
 * @param location
 * @param match
 */
const App = ({ history, location, match, auth, logout }) => {
  const { pathname } = location;

  const isHiddenLogout = () => {
    return !isAuthenticated(auth);
  };

  const isHiddenNav = () => {
    return pathname === '/login' || pathname === '/signup';
  };

  return (
    <div className="container">
      <nav className="navbar navbar-dark bg-dark" hidden={isHiddenNav()}>
        <button className="navbar-toggler" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to="/">Home</Link>
          <Link className="dropdown-item" to="/about">About</Link>
          <Link className="dropdown-item" to="/login">Log In</Link>
          <Link className="dropdown-item" to="/signup">Sign Up</Link>
        </div>
        <a className="navbar-brand" href="/">Todo Service</a>
        <button type="button" className="btn btn-danger" onClick={e => logout()} hidden={isHiddenLogout()}>Logout</button>
      </nav>
      <Switch>
        <PrivateRoute exact path="/" component={Todo} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(Actions.logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
