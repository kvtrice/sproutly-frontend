import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EditCommentNavigation = ({ post, setIsDeleteShowing, setCommentToDelete, loggedInUserId }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const nav = useNavigate()

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navigateToEdit = () => {
        nav(`/comment/${post._id}/edit`)
    }

    const handleDeleteWarning = () => {
        setIsDeleteShowing(true)
        setCommentToDelete(post._id)
    }

	return (
		<div>
			<div>
				{/*  Need to add logic to also check if the comment belongs to the currently logged in user */}
				{(post.isComment && loggedInUserId === post.user._id) ? (
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
			<div
				className={
					isMenuOpen ? "menu-button edit-menu-wrapper" : "hidden"
				}
			>
				<div className="edit-menu-container">
					<p className="menu-button" onClick={navigateToEdit}>
						Edit Comment
					</p>
					<p
						className="menu-button"
						onClick={handleDeleteWarning}
					>
						Delete Comment
					</p>
				</div>
			</div>
		</div>
	);
};

export default EditCommentNavigation;
