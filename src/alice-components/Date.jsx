import React, { useState, useEffect } from 'react'

async function fetchPostData(postId) {
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const data = await response.json()
    return data
  }

function DatePost() {

  const [date,setDate] = useState()

  useEffect(() => {
    fetchDatePost()
  }, [])

  // For testing purposes, hardcoded an existing postID 
  const postId = '65d3fafda444c0564fad7c53'

  const fetchDatePost = async () => {
    const data = await fetchPostData(postId)
    // Extract the date part (YYYY-MM-DD) from the string
    const formattedDate = new Date(data.createdDateTime).toISOString().split('T')[0];
    setDate(formattedDate);
  }

  return (
<p>{date}</p>
  )
}

export default DatePost