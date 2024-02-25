import React from "react";
import './DisplayPost.css'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import LikeButton from './LikeButton'
import CommentsCount from './CommentsCount'
import PostTitle from "./PostTitle"
import PostTag from "./PostTag"
import EditPostNavigation from "./EditPostNavigation"

const DisplayPost = ({
	post,
	posts,
	setPosts
}) => {
	return (
		<div className="component-wrapper display-post">
			<div className="post">
				<div className="post-header">
					<UserDetails post={post} />
					<div className="post-right-corner">
						<PostDateTime post={post} />
						<EditPostNavigation post={post} />
					</div>
				</div>
				<div className="post-text-tags">
					<PostTitle post={post} />
					<PostText post={post} />
					<PostTag
						post={post}
					/>
				</div>
				<div className="post-image">
					<PostImage post={post} />
				</div>
				<div className="post-interaction">
					<LikeButton post={post} posts={posts} setPosts={setPosts} />
					<CommentsCount posts={posts} parentID={post._id} />
				</div>
			</div>
		</div>
	);
};

export default DisplayPost;
