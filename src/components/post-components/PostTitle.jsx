import React from 'react'
import { Link } from "react-router-dom"

function PostTitle({ post }) {
  return (
    //if I do /post/${post._id} but we are already on the post it will just concatenate /post/${post._id}/post/${post._id} so the solution is to be specific about the entire link to.
    <Link to={`http://localhost:5173/post/${post._id}`}>{post.title}</Link>
  )    
}


export default PostTitle