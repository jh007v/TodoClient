import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ location }) => {
  console.log('location', location);
  return (
    <div className="NotFound">
      <h1>404</h1>
      <b>File not found</b>
    </div>
  );
}

export default withRouter(connect()(NotFound));
