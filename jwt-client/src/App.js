import React, { Component } from 'react';
import './App.css';
import clientAuth from './clientAuth'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

//App components
import Header from './header'
import Signup from './signup'
import Login from './login'
import Home from './home'
import Profile from './profile'
import ImageUploader from './imageupload'
import Post from './post'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
    }
  }
  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
    })
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data)=>{
      console.log(data);
      // this.setState({
      //   view: 'login'
      // })
    })
  }

  _logIn(credentials) {
    clientAuth.logIn(credentials).then((user) =>{
      console.log(user)
      this.setState({
        currentUser: user,
        loggedIn: true,
      })
    })
  }
  _logOut() {
    clientAuth.logOut().then(message => {
      this.setState({
        currentUser: null,
        loggedIn: false,
      })
    })
  }
  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
    view: view
    })
  }

  render() {
    return (
      <BrowserRouter loggedIn={this.state.loggedIn}
      currentUser={this.state.currentUser}>
        <div className="container-fluid">
            <Header/>
            <Switch>
              <Route exact path="/" component= {()=> <Home loggedIn={this.state.loggedIn}
              currentUser={this.state.currentUser}/> }/>
              <Route path="/signup" component={() => <Signup onSignup={this._signUp.bind(this)}/> }/>
              <Route path="/login/:id" component= {()=> <Profile currentUser={clientAuth.getCurrentUser()} />}/>
              <Route exact path="/login" component= {() => <Login onLogin={this._logIn.bind(this)}/> }/>
              <Route path='/logout' onClick={this._logOut.bind(this)}/>
              <Route exact path="/post" component= {() => <Post/>}/>
              {/* <Redirect from='/logout' to='/'/>
              <Route path='/' component={Home}/> */}
            </Switch>
            <ImageUploader/>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
