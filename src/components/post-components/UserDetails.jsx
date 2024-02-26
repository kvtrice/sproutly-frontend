import React from 'react'
import './UserDetails.css'
import { useNavigate } from "react-router-dom"

function UserDetails({post}) {
  const user_id = post.user._id
  const username = post.user.username
  const profilePicture = post.user.profilePicture
  const nav = useNavigate()

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