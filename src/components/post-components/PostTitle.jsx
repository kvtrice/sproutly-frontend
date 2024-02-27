import React from 'react'
import { useNavigate } from "react-router-dom"

function PostTitle({ post }) {
  const nav = useNavigate()

  const handleNavigateToCreatePost = () => {
    nav(`/post/${post._id}`)
  }

  return (
    <div className="post-title" onClick={handleNavigateToCreatePost}>
        {post.title}
    </div>
  )    
}


export default PostTitle