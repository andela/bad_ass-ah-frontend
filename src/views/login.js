import React, { Component } from 'react'
import Buttons from '../components/buttons';

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2> Welcome to Author's Haven!</h2>
        <form>
          <label>User Name</label>
          <input type="email" placeholder="Email" />
          <label>Password</label>
          <input type="password" placeholder="password" />
          <Buttons/>
        </form>
      </div>
    )
  }
}
