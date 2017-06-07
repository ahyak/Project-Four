import React from 'react'

const Home = (props) => (
      <div className='container-fluid'>
        <h2>Welcome to Moving Out,</h2>
        <h3>{props.loggedIn ? props.currentUser.firstname : 'Not Logged In'}</h3>
      <p className="App-intro" >
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      </div>
);

export default Home;
