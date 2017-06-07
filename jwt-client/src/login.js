import React, { Component } from 'react'
// import {Route, Redirect} from 'react-router-dom'

class Login extends Component {
  _handleLogin= (evt) => {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    console.log(credentials)
    this.props.onLogin(credentials)

  }

  render() {
    return (
      <div className='container'>
        <h2>Log In</h2>
        <form onSubmit={this._handleLogin.bind(this)}>
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}

export default Login;
