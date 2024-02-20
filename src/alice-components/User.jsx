import React, { useState, useEffect } from 'react'

async function fetchsinglePostData(postId) {
  const response = await fetch(`http://localhost:4001/posts/${postId}`)
  const data = await response.json()
  return data
}

function UserDetails({postId}) {
  const [username, setUsername] = useState()
  const [profilePicture, setProfilePicture] = useState()

  useEffect(() => {
    fetchUser()
  }, [postId])

  const fetchUser = async () => {
    const data = await fetchsinglePostData(postId)
    setProfilePicture(data.user.profilePicture)
    setUsername(data.user.username)
  }

  //the question mark ensure that nothing is rendered if there no image field in a post
  return (
    <div className="is-flex">
      <figure className="image is-48x48 is-inline-block mr-2">
        <img className="is-rounded" src={profilePicture} alt="profile picture of user" />
      </figure>
      <b>{username}</b>
    </div>
  )
}

export default UserDetails