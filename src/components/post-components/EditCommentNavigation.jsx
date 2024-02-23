import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EditCommentNavigation = ({ post, setIsDeleteShowing, setCommentToDelete }) => {
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
                {(post.isComment) && (post.isThreadStarter === false) ? <AiOutlineEllipsis onClick={handleMenu} cursor="pointer"/> : ""}
            </div>
            <div className={isMenuOpen ? 'menu-button' : 'hidden'}>
                <button onClick={navigateToEdit}>Edit Comment</button>
                <button onClick={handleDeleteWarning}>Delete Comment</button>
            </div>
        </div>
    )
};

export default EditCommentNavigation;
