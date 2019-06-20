import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import NavBar from './Navbar';


const Layout = (props) => {
  // eslint-disable-next-line react/prop-types
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
