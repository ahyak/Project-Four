import React, { Component } from 'react'

class Signup extends Component {

  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='container'>
          <div className='text-center page-header'>
            <h3> Signup </h3>
          </div>
          <form onSubmit={this._handleSignup.bind(this)}>
              <div className='form-group'>
                <label>First Name:</label>
                <input type='text' className= "form-control" placeholder='First Name' ref='firstname' />
              </div>
              <div className='form-group'>
                <label>Last Name:</label>
                <input type='text' className= "form-control" placeholder='Last Name' ref='lastname' />
              </div>
              <div className='form-group'>
                <label>Email:</label>
                <input type='text' className= "form-control" placeholder='Email' ref='email' />
              </div>
              <div className='form-group'>
                <label>Password:</label>
                <input type='password' className= "form-control" placeholder='Password' ref='password' />
              </div>
              <div className='form-group'>
                <button className= "btn btn-primary" type='submit'>Create Account</button>
              </div>
          </form>
        </div>

    )
  }
}

export default Signup;
