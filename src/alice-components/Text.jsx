import React, { useState, useEffect } from 'react'

async function fetchPostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function TextPost() {

  const [text,setText] = useState()

  useEffect(() => {
    fetchTextPost()
  }, [])

  // For testing purposes, hardcoded an existing postID 
  const postId = '65d2f5665305d3958a7ee6ed'

  const fetchTextPost = async () => {
    const data = await fetchPostData(postId)
    setText(data.content)
  }

  return (
<p>{text}</p>
  )
}

export default TextPost