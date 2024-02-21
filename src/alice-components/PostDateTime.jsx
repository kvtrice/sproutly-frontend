import React from 'react'

function PostDateTime({ post }) {
  // Extract the date part (YYYY-MM-DD) from the string
  const formattedDate = new Date(post.createdDateTime).toISOString().split('T')[0]

  return <p>{formattedDate}</p>
}

export default PostDateTime