import React, { useState, useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa'


async function fetchPostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function LikeButton({postId}) {

  const [likes, setLikes] = useState()

  useEffect(() => {
    fetchLikes()
  }, [postId])


  const fetchLikes = async () => {
    const data = await fetchPostData(postId)
    setLikes(data.reactions.length)
  }

  const addLike = async () => {
      const data = await fetchPostData(postId)
      const existingReactions = data.reactions
      console.log(existingReactions)
      // testing purpose hardcoded an existing userID
      const updatedReactions = [...existingReactions, "65d2f5665305d3958a7ee6e8"]


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
    <div>
      <p className="mb-1">{likes} reactions</p>
      <button  className= "icon is-medium" onClick={addLike}>
        <FaThumbsUp />
      </button>
    </div>
    )
}

export default LikeButton