import React, { Component } from 'react'

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
      <div className="container">
        <div className='text-center page-header'>
          <h3> Login </h3>
        </div>
          <form onSubmit={this._handleLogin.bind(this)}>
            <div className='form-group'>
              <label>Email address:</label>
              <input type='text' className= "form-control" placeholder='Email' ref='email' />
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input type='password' className= "form-control" placeholder='Password' ref='password' />
            </div>
            <div className='form-group'>
              <button className= "btn btn-primary" type='submit'>Log In</button>
            </div>
          </form>
      </div>

    )
  }
}

export default Login;
