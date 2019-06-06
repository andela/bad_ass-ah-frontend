import React from 'react';
import spinner from '../../../assets/Images/spinner/spinner001.gif';

export const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{ width: '40px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;
