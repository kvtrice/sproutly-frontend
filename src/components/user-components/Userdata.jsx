import React from 'react'

function UserData({users,user_id}) {
  const user = users.find((user) => user._id === user_id)
  // ? to prevent the error that user is undefined
  const username = user?.username
  const profilePicture = user?.profilePicture
  const plants = user?.plants
  
  return (
    <div className="user-details-container">
      <div className="user-image-div">
        <img className="user-image " src={profilePicture} alt="profile picture of user" />
      </div>
      <h3>{username}</h3>
      <div className='plants-wrapper'>
      {plants?.map((plant, index) => (
        <span key={index} className="post-tags tag">
          {plant}
        </span>
      ))}
    </div>
    </div>
  )
}

export default UserData