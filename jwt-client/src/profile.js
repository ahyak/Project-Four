import React from 'react'

const Profile = (props) => {
  let id = props.currentUser._id

  return(
    <div className="container-fluid">
      <h1>User Profile</h1>
      <h4>First Name: {props.currentUser.firstname}</h4>
      <h4>Last Name: {props.currentUser.lastname}</h4>
      <h4>Email: {props.currentUser.email}</h4>
    </div>
  )
}

export default Profile;
