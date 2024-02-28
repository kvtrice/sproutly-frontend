import React from 'react'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import CommentsCount from './CommentsCount'
import LikeButton from './LikeButton'
import PostTitle from './PostTitle'
import PostTag from './PostTag'
import EditPostNavigation from "./EditPostNavigation";
import "./DisplayPost.css";

// this is a componen that was created to be used in the context of a single thread page.
function DisplayParent({
	parentID,
	posts,
	setPosts,
	isUserLoggedIn,
	loggedInUserId,
}) {
	// this is to define from the posts prop objects received from parents component to filter to that specific parentID aka the single parent post.
	const parents = posts.filter((item) => item._id === parentID);

	return (
		<div>
			{parents.map((parent) => (
				<div key={parent._id} className="post">
					<div className="post-header">
						<UserDetails post={parent} />
						<div className="post-right-corner">
							<PostDateTime post={parent} />
							<EditPostNavigation
								post={parent}
								loggedInUserId={loggedInUserId}
							/>
						</div>
					</div>
					<div className="post-text-tags">
						<PostTitle post={parent} />
						<PostText post={parent} />
						<PostTag post={parent} />
					</div>
					<div className="post-image">
						<PostImage post={parent} />
					</div>
					<div className="post-interaction">
						<LikeButton
							post={parent}
							posts={posts}
							setPosts={setPosts}
							isUserLoggedIn={isUserLoggedIn}
							loggedInUserId={loggedInUserId}
						/>
						<CommentsCount posts={posts} parentID={parent._id} />
					</div>
				</div>
			))}
		</div>
	);
}

export default DisplayParent