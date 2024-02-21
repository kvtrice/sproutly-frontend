import React, { useState, useEffect } from 'react'

async function fetchsinglePostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function TextPost({postId}) {

  const [text,setText] = useState()

  useEffect(() => {
    fetchTextPost()
  }, [postId])

  const fetchTextPost = async () => {
    const data = await fetchsinglePostData(postId)
    setText(data.content)
  }

  return (
<p>{text}</p>
  )
}

export default TextPost