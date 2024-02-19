import React, { useState, useEffect } from 'react'

async function fetchPostData(postId) {
  const response = await fetch(`http://localhost:4001/posts/${postId}`)
  const data = await response.json()
  return data
}

function ImagePost() {
  const [image, setImage] = useState()

  useEffect(() => {
    fetchImagePost()
  }, [])

  // For testing purposes, hardcoded an existing postID
  const postId = '65d2f5665305d3958a7ee6ed'

  const fetchImagePost = async () => {
    const data = await fetchPostData(postId)
    setImage(data.image)
  }

  //the question mark ensure that nothing is rendered if there no image field in a post
  return (
    <div>
      {image ? <img src={image} alt="post image" /> : null}
    </div>
  )
}

export default ImagePost