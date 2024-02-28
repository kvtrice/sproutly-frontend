import React from 'react'

// this child component is to render the user data of a user, this need to be created and the data fetch from the users route since a user profile page is not directly link to a post
// so this is different to the userDetails in the post components
function UserData({users,user_id}) {
  const user = users.find((user) => user._id === user_id)
  // ? to prevent the error that user is undefined
  const username = user?.username
  const profilePicture = user?.profilePicture
  const plants = user?.plants
  
  return (
		<div className="profile-details">
			<div className='profile-details-container'>
				<div className="user-image-div">
					<img
						className="image"
						src={profilePicture}
						alt="profile picture of user"
					/>
				</div>
				<h3 className='username'>{username}</h3>
			</div>
			<div>
				<div className='plants-owned-text'>
					<p>Plants owned by {username}:</p>
				</div>
				<div className="profile-plants-wrapper">
					{plants?.map((plant, index) => (
						<span key={index} className="post-tags tag">
							{plant}
						</span>
					))}
				</div>
			</div>
		</div>
  );
}

export default UserData