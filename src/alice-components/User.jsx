import React, { useState, useEffect } from 'react'

async function fetchPostData(postId) {
  const response = await fetch(`http://localhost:4001/posts/${postId}`)
  const data = await response.json()
  return data
}

function UserDetails() {
  const [username, setUsername] = useState()
  const [profilePicture, setProfilePicture] = useState()

  useEffect(() => {
    fetchUser()
  }, [])

  // For testing purposes, hardcoded an existing postID
  const postId = '65d3fafda444c0564fad7c53'

  const fetchUser = async () => {
    const data = await fetchPostData(postId)
    setProfilePicture(data.user.profilePicture)
    setUsername(data.user.username)
  }

  //the question mark ensure that nothing is rendered if there no image field in a post
  return (
    <div>
       <b>{username} </b> 
      <img src={profilePicture} alt="profile picture of user" /> 
    </div>
  )
}

export default UserDetails