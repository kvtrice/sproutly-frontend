import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const EditPostNavigation = ({ post, loggedInUserId }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const nav = useNavigate();

	// function to handle opening the menu (from the 3 dots icon in the top right of a post)
	const handleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Funtion to navigate to edit the comment based on the postId
	const navigateToEdit = () => {
		nav(`/post/${post._id}/edit`);
	};

	return (
		<div>
			<div>
				{/*  Logic to check that it is a post (not a comment) AND it belongs to the currently logged in user */}
				{post.isThreadStarter && loggedInUserId === post.user._id ? (
					<AiOutlineEllipsis
						className="post-menu"
						size={30}
						onClick={handleMenu}
						cursor="pointer"
					/>
				) : (
					""
				)}
			</div>
			{/* Set class & styling based on if the menu is open or not */}
			<div
				className={
					isMenuOpen ? "menu-button edit-menu-wrapper" : "hidden"
				}
			>
				<div className="edit-menu-container">
					<p className="menu-button" onClick={navigateToEdit}>
						Edit Post
					</p>
				</div>
			</div>
		</div>
	);
};

export default EditPostNavigation;
