import React from 'react'

function PostText({post}) {
  return (
		<div className='post-text'>
			<p>{post.content}</p>
		</div>
  );
}

export default PostText