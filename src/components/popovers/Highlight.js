import React from 'react';
import PropTypes from 'prop-types';

const Highlight = ({ onHighlight }) => (
  <div id="highlight-popup" className="popup hide">
    <button id="highlight-btn" type="button" onClick={onHighlight}>
      <i className="fa fa-highlighter" /> Highlight
    </button>
  </div>
);

Highlight.propTypes = {
  onHighlight: PropTypes.func.isRequired,
};

export default Highlight;
