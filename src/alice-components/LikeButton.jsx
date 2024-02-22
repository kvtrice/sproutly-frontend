import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

function LikeButton({ post, posts, setPosts }) {
  const [likes, setLikes] = useState()

  useEffect(() => {
    const reactionsLength = post.reactions.length
    setLikes(reactionsLength)
  }, [post])

  const handleAddLike = () => {
    addLike(post._id)
    setLikes(likes + 1)
  }

const addLike = async (postId) => {

  if (Array.isArray(posts)) {
    const postIndex = posts.findIndex((post) => post._id === postId);
    const post = posts[postIndex]
    const updatedReactions = [
      ...post.reactions,
      "65d2f5665305d3958a7ee6e8",
    ]


    await fetch(`http://localhost:4001/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reactions: updatedReactions }),
    })

  
    const response = await fetch(`http://localhost:4001/posts/${postId}`);
    const updatedPost = await response.json()


    const updatedPosts = [...posts]
    updatedPosts[postIndex] = updatedPost
    setPosts(updatedPosts)
  } else {
    const updatedReactions = [
      ...posts.reactions,
      "65d2f5665305d3958a7ee6e8",
    ]

    await fetch(`http://localhost:4001/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reactions: updatedReactions }),
    })

    const response = await fetch(`http://localhost:4001/posts/${postId}`);
    const updatedPost = await response.json()

    setPosts(updatedPost)
  }
}

  return (
    <div>
      <p className="mb-1">{likes} reactions</p>
      <button className="icon is-medium" onClick={handleAddLike}>
        <FaThumbsUp />
      </button>
    </div>
  )
}

export default LikeButton