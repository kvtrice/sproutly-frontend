import React from 'react'
import { useNavigate } from "react-router-dom"

function PostTitle({ post }) {
  const nav = useNavigate()

  // allow user to click on the title of the post to then navigate to the specific ThreadPage of that parent post 
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