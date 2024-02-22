import React from 'react'

function PostTag({ post }) {
  return (
    <div>
      tags:
      {post.tags.map((tag, index) => (
        <span key={index} className="tag is-primary m-2">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default PostTag