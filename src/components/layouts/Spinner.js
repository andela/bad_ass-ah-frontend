import React, { Fragment } from 'react';
import spinner from '../../assets/Images/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '70px', margin: 'auto', display: 'block' }}
      alt="loading"
    />
  </Fragment>
);

export default Spinner;
