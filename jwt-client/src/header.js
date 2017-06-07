import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import clientAuth from './clientAuth'

class Header extends Component {

  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
      })
    })
  }
  render() {
    return (
      <header>
        <nav className="navbar navbar-inverse">
          <ul className="nav navbar-nav">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/logout">Logout</NavLink></li>
            <li><NavLink to="/post">Posts</NavLink></li>
          </ul>
        </nav>
      </header>
    )
  }
}
export default Header;
