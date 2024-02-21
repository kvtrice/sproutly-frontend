import React, { useState, useEffect } from 'react'

async function fetchsinglePostData(postId) {
  const response = await fetch(`http://localhost:4001/posts/${postId}`)
  const data = await response.json()
  return data
}

function ImagePost({ postId }) {
  const [image, setImage] = useState()

  useEffect(() => {
    fetchImagePost()
  }, [postId])

  const fetchImagePost = async () => {
    const data = await fetchsinglePostData(postId)
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