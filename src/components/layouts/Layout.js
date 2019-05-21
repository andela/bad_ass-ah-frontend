import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import NavBar from './Navbar';


const Layout = (props) => {
  const { children } = props;
  return (
    <Fragment>
      <NavBar />
      {children}
      <Footer />
    </Fragment>
  );
};
Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
