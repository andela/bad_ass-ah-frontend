import React from 'react';
import {Link} from "react-router-dom";

const Navbar=(props)=> {
  return (
    <div>
    <Link  to="/"> Login </Link>
    <Link to="/articles">Articles</Link>
      {props.children}
    </div>
  )
}
export default Navbar;