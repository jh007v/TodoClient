import React from 'react';
import { connect } from 'react-redux';
import './About.css';

const About = () => {
  return (
    <div className="About">
      <b>About</b>
    </div>
  );
}

export default connect()(About);
