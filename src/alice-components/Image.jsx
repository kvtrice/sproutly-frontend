import React from 'react'

function ImagePost({ post }) {
  //the question mark ensures that nothing is rendered if there is no image field in a post
  return (
    <div>
      {post.image ? <img src={post.image} alt="post image" /> : null}
    </div>
  )
}

export default ImagePost