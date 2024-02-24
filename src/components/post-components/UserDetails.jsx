import React from 'react'
import './UserDetails.css'
import { Link } from "react-router-dom"

function UserDetails({post}) {
  const user_id = post.user._id
  const username = post.user.username
  const profilePicture = post.user.profilePicture

  return (
    <Link to={`/profile/${user_id}`}>
    <div className="user-details-container">
      <div className="user-image-div">
        <img className="user-image " src={profilePicture} alt="profile picture of user" />
      </div>
      <h3>{username}</h3>
    </div>
    </Link>
  )
}

export default UserDetails