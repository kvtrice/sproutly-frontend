import React from 'react'
import './UserDetails.css'
import { useNavigate } from "react-router-dom"

function UserDetails({post}) {
  const user_id = post.user._id
  const username = post.user.username
  const profilePicture = post.user.profilePicture
  const nav = useNavigate()

    // allow user to click on the profilePicture or username of the creator of a of the post to then navigate to the user profile page
  const handleNaviageToProfilePage = () => {
    nav(`/user/${user_id}`)
  }

  return (
    <div onClick={handleNaviageToProfilePage} className="user-details-container">
      <div className="user-image-div">
        <img className="user-image " src={profilePicture} alt="" />
      </div>
      <h3>{username}</h3>
    </div>
  )
}

export default UserDetails