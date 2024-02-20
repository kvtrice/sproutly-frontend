import React from 'react'

function UserDetails({post}) {
  const username = post.user.username
  const profilePicture = post.user.profilePicture

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