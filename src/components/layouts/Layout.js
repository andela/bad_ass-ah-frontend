/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import NavBar from './Navbar';


const Layout = (props) => {
  const { children, display } = props;
  return (
    <Fragment>
    <NavBar display={display}/>
     {children}
    <Footer />
    </Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
