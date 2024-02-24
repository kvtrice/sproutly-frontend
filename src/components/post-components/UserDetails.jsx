import React from 'react'
import './UserDetails.css'

function UserDetails({post}) {
  const username = post.user.username
  const profilePicture = post.user.profilePicture

  return (
    <div className="user-details-container">
      <div className="user-image-div">
        <img className="user-image " src={profilePicture} alt="profile picture of user" />
      </div>
      <h3>{username}</h3>
    </div>
  )
}

export default UserDetails