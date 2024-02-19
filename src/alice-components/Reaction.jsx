import React, { useState, useEffect } from 'react'

async function fetchPostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function LikeButton() {

  const [likes, setLikes] = useState()

  useEffect(() => {
    fetchLikes()
  }, [])

  // For testing purposes, set the postID to something
  const postId = '65d2e1373d8e4dc65b2338b5'

  const fetchLikes = async () => {
    const data = await fetchPostData(postId)
    setLikes(data.reactions.length)
  }

  const addLike = async () => {
      const data = await fetchPostData(postId)
      const existingReactions = data.reactions
      console.log(existingReactions)
      // testing purpose im using 65d2e1373d8e4dc65b2338b1
      const updatedReactions = [...existingReactions, "65d2e1373d8e4dc65b2338b1"]


      // Update the backend with the updated reactions
      await fetch(`http://localhost:4001/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactions: updatedReactions }),
      })

    // Update with a new count of the array length 
    fetchLikes()

    }  

  return (
    <button onClick={addLike}>
      {likes} reactions
    </button>
  )
}

export default LikeButton