import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Loading = ({ loading, message }) => (
  <Fragment>
    <div className="G-loadingLine" style={loading === true ? { display: 'block' } : { display: 'none' }}>
      <div className="G-loading-inline" />
      {message !== '' && (
      <div className="G-successMessage">
        <div>
          {' '}
          { message }
          {' '}
        </div>
      </div>
      )}
    </div>
  </Fragment>
);

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
};
export default Loading;
