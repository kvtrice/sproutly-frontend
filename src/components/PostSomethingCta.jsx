import React from 'react'
import './PostSomethingCta.css'
import { useNavigate } from 'react-router-dom'

const PostSomethingCta = ({ loggedInUserPictureUrl }) => {
	const nav = useNavigate();

	// Handler to navigate to create post on click
	const handleNavToCreatePost = () => {
		nav("/post/new");
	};

	return (
		<div className="post-something-wrapper">
			<div className="post-something-container component-wrapper">
				<div className="profile-picture">
					<img
						className="user-profile-picture"
						src={loggedInUserPictureUrl}
					/>
				</div>
				<div className="post-something-input">
					<input
						className="input"
						type="text"
						placeholder="Post something..."
						onClick={handleNavToCreatePost}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostSomethingCta