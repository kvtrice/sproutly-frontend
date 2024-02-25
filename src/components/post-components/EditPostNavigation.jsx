import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const EditPostNavigation = ({ post }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const nav = useNavigate()

    const handleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navigateToEdit = () => {
        nav(`/post/${post._id}/edit`)
    }

	return (
		<div>
			<div>
				{/*  Need to add logic to also check if the post belong to the currently logged in user */}
				{post.isThreadStarter ? (
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
			<div
				className={
					isMenuOpen ? "menu-button edit-menu-wrapper" : "hidden"
				}
			>
				<div className="edit-menu-container">
					<button
						className="button is-primary is-small"
						onClick={navigateToEdit}
					>
						Edit Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditPostNavigation;
