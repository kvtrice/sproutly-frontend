import React from "react";
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import LikeButton from './LikeButton'
import CommentsCount from './CommentsCount'
import PostTitle from "./PostTitle"
import PostTag from "./PostTag"
import EditPostNavigation from "./EditPostNavigation"

const DisplayPost = ({ post, posts, setPosts }) => {
	return (
		<div>
			<UserDetails post={post} />
			<PostDateTime post={post} />
			<EditPostNavigation post={post} />
			<PostTitle post={post} />
			<PostText post={post} />
			<PostTag post={post}/>
			<PostImage post={post} />
			<LikeButton post={post} posts={posts} setPosts={setPosts} />
			<CommentsCount posts={posts} parentID={post._id} />
		</div>
	)
}

export default DisplayPost;
