import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EditCommentNavigation = ({
	post,
	setIsDeleteShowing,
	commentToDelete,
	setCommentToDelete,
	loggedInUserId,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const nav = useNavigate();

	// function to handle opening the menu (from the 3 dots icon in the top right of a comment)
	const handleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// Funtion to navigate to edit the comment based on the postId
	const navigateToEdit = () => {
		nav(`/comment/${post._id}/edit`);
	};

	// Function to handle displaying a warning message when a user chooses to delete a comment
	const handleDeleteWarning = () => {
		// Display the warning message
		setIsDeleteShowing(true);
		// Update the state to be the id of the comment to be deleted based on the current comment being interacted with
		setCommentToDelete((prevCommentToDelete) => {
			const newCommentToDelete = post._id;
			return newCommentToDelete;
		});
	};

	return (
		<div>
			<div>
				{/*  Logic to check that it is a comment (not a post) AND it belongs to the currently logged in user */}
				{post.isComment && loggedInUserId === post.user._id ? (
					<AiOutlineEllipsis
						size={30}
						className="post-menu"
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
						Edit Comment
					</p>
					{/* When the delete comment button is clicked on the current comment, display the warning and set the commentToBeDleted to this comments ID */}
					<p className="menu-button" onClick={handleDeleteWarning}>
						Delete Comment
					</p>
				</div>
			</div>
		</div>
	);
};

export default EditCommentNavigation;
