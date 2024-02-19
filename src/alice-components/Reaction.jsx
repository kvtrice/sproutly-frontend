import React, { useState, useEffect } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState()

  useEffect(() => {
    fetchLikes()
  }, [])

  // For testing purposes, set the postID to something
  const postId = '65d2db357ae9a04d4ca82b66'

  const fetchLikes = async () => {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()

    // Reaction is an array of users who liked the post, so we need the number of elements in the array as a count of how many likes.
    setLikes(data.reactions.length)
  }

  const addLike = async () => {    
    const response = await fetch(`http://localhost:4001/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reactions: "65d2a391305ef18ce544da03" })
    })

    if (response.ok) {
      // Update with a new count of the array length 
      fetchLikes()
    }
  }

  return (
    <button onClick={addLike}>
      {likes} reactions
    </button>
  )
}

export default LikeButton;