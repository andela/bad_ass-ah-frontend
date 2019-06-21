/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { Fragment, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import NavBar from './Navbar';


const Layout = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, display } = props;
  const [hide, setHide] = useState({
    hide: false
  });
  const onHide = useCallback(() => {
    setHide({ hide: true });
  });
  return (
    <Fragment>
    <div data-test="G-onHide" onClick={onHide}>
    <NavBar display={display} onHide={hide}/>
      {children}
      <Footer />
    </div>
    </Fragment>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
