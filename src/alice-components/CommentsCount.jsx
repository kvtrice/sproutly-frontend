import React from 'react'
import { Link } from "react-router-dom"

function CommentsCount({ parentID, posts }) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID)
    const numComments = commentsWithParentID.length;
  
    return (
      <Link to={`post/${parentID}`}>{numComments} comments</Link>
    )
  }

export default CommentsCount