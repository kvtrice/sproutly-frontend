import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PostDateTime from "./PostDateTime";
import PostText from "./PostText";
import PostImage from "./PostImage";
import LikeButton from "./LikeButton";
import SortFilter from "./SortFilter";
import EditCommentNavigation from "./EditCommentNavigation";
import "./DisplayPost.css";
import "./DisplayComments.css";

function DisplayComments({
	parentID,
	posts,
	setPosts,
	isDeleteShowing,
	setIsDeleteShowing,
	setCommentToDelete,
	loggedInUserId,
	isUserLoggedIn
}) {
	const commentsWithParentID = posts.filter(
		(item) => item.parentID === parentID
	);

	// LikeButton post={comment} posts={posts}, the single post need to be post={comment} for each filtered objects but the posts are the array of posts
	//that was passed by the Parent component so posts has to be posts={posts} and not posts={comment} or
	//at setPosts change of Liking a post it will change the array of posts to that single object clicked. I learnt the hard way
	return (
		<div>
			{commentsWithParentID.length > 0 ? (
				<div className="sort-component">
					<SortFilter posts={posts} setPosts={setPosts} />
				</div>
			) : null}
			{commentsWithParentID.map((comment) => (
				<div key={comment._id}>
					<hr />
					<div className="post-header">
						<UserDetails post={comment} />
						<div className="post-right-corner">
							<PostDateTime post={comment} />
							<EditCommentNavigation
								post={comment}
								parentID={parentID}
								isDeleteShowing={isDeleteShowing}
								setIsDeleteShowing={setIsDeleteShowing}
								setCommentToDelete={setCommentToDelete}
								loggedInUserId={loggedInUserId}
							/>
						</div>
					</div>
					<PostText post={comment} />
					<div className="post-image">
						<PostImage post={comment} />
					</div>
					<LikeButton
						post={comment}
						posts={posts}
						setPosts={setPosts}
						isUserLoggedIn={isUserLoggedIn}
						loggedInUserId= {loggedInUserId}
					/>
				</div>
			))}
		</div>
	);
}

export default DisplayComments;
