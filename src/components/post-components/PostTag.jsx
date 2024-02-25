import React from 'react'

function PostTag({
	post
}) {
	return (
		<div className="post-tags-wrapper">
			{post.tags.map((tag, index) => (
				<span
					key={index}
					className="post-tags tag"
				>
					{tag}
				</span>
			))}
		</div>
	);
}

export default PostTag