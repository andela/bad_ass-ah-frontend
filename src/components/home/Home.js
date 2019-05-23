/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';

export class Home extends Component {
  state = {};

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <h1>
          Welcome to Authors Haven
          {' '}
        </h1>
      </div>
    );
  }
}

export default Home;
