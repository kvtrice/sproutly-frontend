import React from "react";
import { useNavigate } from "react-router";

const NavBarCreatePost = () => {

	const nav = useNavigate();

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
