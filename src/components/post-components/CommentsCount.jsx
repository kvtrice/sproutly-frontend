import React from 'react'
import { Link } from "react-router-dom"
import "./CommentsCount.css";

function CommentsCount({ parentID, posts }) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID)
    const numComments = commentsWithParentID.length;
  
    return (
		<div className="comment-count-container">
			<Link to={`http://localhost:5173/post/${parentID}`}>
				<span className="comment-text">{numComments} comments</span>
			</Link>
		</div>
	);
  }

export default CommentsCount