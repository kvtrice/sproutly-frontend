import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./CommentsCount.css";

function CommentsCount({ parentID, posts }) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID)
    const numComments = commentsWithParentID.length;

	const nav = useNavigate()
	
	const handleNavigateToParent = () => {
		nav(`/post/${parentID}`)
	}
  
    return (
		<div className="comment-count-container">
				<span onClick={handleNavigateToParent} className="comment-text">{numComments} comments</span>
		</div>
	);
  }

export default CommentsCount