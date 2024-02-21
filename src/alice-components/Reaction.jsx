import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

function LikeButton({ post, addLike }) {
  const [likes, setLikes] = useState()

  useEffect(() => {
    const reactionsLength = post.reactions.length
    setLikes(reactionsLength)
  }, [post])

  const handleAddLike = () => {
    addLike(post._id)
    setLikes(likes + 1)
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