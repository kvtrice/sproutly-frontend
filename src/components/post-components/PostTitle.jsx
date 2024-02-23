import React from 'react'
import { Link } from "react-router-dom"

function PostTitle({ post }) {
  return (
    <Link to={`post/${post._id}`}>{post.title}</Link>
  )    
}


export default PostTitle