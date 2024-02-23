import React from 'react'

function PostText({post}) {
  return (
		<div>
			<p>{post.content}</p>
		</div>
  );
}

export default PostText