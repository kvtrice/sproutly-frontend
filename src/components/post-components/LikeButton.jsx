import React, { useState, useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import {jwtDecode} from 'jwt-decode'
import "./LikeButton.css";

function LikeButton({ post, posts, setPosts, isUserLoggedIn,loggedInUserId}) {
	const [likes, setLikes] = useState();
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		const reactionsLength = post.reactions.length;
		setLikes(reactionsLength);
		setLiked(post.reactions.includes(loggedInUserId));
	}, [post]);

	const handleAddLike = async () => {
		await addLike(post._id, loggedInUserId);
	};

	// Add like function
	const addLike = async (postId, loggedInUserId) => {
		const postIndex = posts.findIndex((post) => post._id === postId);
		const post = posts[postIndex];

		// Check if user ID exists in reactions
		const updatedReactions = post.reactions.includes(loggedInUserId)
			? post.reactions.filter((id) => id !== loggedInUserId) // Remove user ID
			: [...post.reactions, loggedInUserId];

		// Update the backend with the updated reactions
		await fetch(`https://sproutly-api.onrender.com/posts/${postId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${sessionStorage.getItem('user_id')}`
			},
			body: JSON.stringify({ reactions: updatedReactions }),
		})

		// Fetch the updated post data
		const response = await fetch(`https://sproutly-api.onrender.com/posts/${postId}`);
		const updatedPost = await response.json();

		// Update the posts state with the updated post
		const updatedPosts = [...posts];
		updatedPosts[postIndex] = updatedPost;
		setPosts(updatedPosts);
		setLiked(!liked);
	};

	return (
		<div className="reaction-container">
			{isUserLoggedIn ? (
				<button
					className="like-button-container"
					onClick={handleAddLike}
				>
					<FaThumbsUp
						className={`like-button ${liked ? "liked" : "unliked"}`}
						size={22}
					/>
				</button>
			) : (
				""
			)}
			<p className="reaction-count">{likes} reactions</p>
		</div>
	);
}

export default LikeButton