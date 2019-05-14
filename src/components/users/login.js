import React, { Component } from 'react';
import Navbar from "../layouts/navbar";

export default class Login extends Component {
  render() {
    return (
      <Navbar>
         <h2> Welcome to Author's Haven!</h2>
        <form>
          <label>User Name</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="password" />
          <button type="button">Login </button>
        </form>
      </Navbar>
    )
  }
}
