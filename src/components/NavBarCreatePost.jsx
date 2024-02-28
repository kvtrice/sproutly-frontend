import React from "react";
import { useNavigate } from "react-router";

const NavBarCreatePost = () => {
	// Define useNavigate
	const nav = useNavigate();

	// Handler to navigate to the create post screen
	// Using useNavigate due to routing issues following deployment
	const handleNavigateToCreatePost = () => {
		nav("/post/new");
	};

	return (
		<div>
			<button
				onClick={handleNavigateToCreatePost}
				className="button is-primary"
			>
				Create Post
			</button>
		</div>
	);
};

export default NavBarCreatePost;
