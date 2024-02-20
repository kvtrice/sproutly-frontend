import React, { useState, useEffect } from 'react'

async function fetchsinglePostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function DatePost({ postId }) {

  const [date,setDate] = useState()

  useEffect(() => {
    fetchDatePost()
  }, [postId])

  const fetchDatePost = async () => {
    const data = await fetchsinglePostData(postId)
    // Extract the date part (YYYY-MM-DD) from the string
    const formattedDate = new Date(data.createdDateTime).toISOString().split('T')[0];
    setDate(formattedDate);
  }

  return (
<p>{date}</p>
  )
}

export default DatePost