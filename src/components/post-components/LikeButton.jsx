import React, { useState, useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa'

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

  // Add like function
  const addLike = async (postId) => {
    const postIndex = posts.findIndex((post) => post._id === postId)
    const post = posts[postIndex]
		const updatedReactions = [
			...post.reactions,
			"65d2f5665305d3958a7ee6e8",
		]

    // Update the backend with the updated reactions
		await fetch(`http://localhost:4001/posts/${postId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ reactions: updatedReactions }),
		})

    // Fetch the updated post data
		const response = await fetch(`http://localhost:4001/posts/${postId}`)
		const updatedPost = await response.json()

		// Update the posts state with the updated post
		const updatedPosts = [...posts]
		updatedPosts[postIndex] = updatedPost
		setPosts(updatedPosts)
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