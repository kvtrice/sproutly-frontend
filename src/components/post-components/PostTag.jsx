import React from 'react'

function PostTag({
	post
}) 

// the map is there since each play is it's own object within the tags array
{
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