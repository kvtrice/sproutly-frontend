import React, { useState, useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import {jwtDecode} from 'jwt-decode'
import "./LikeButton.css";

// taking props from the parents component
function LikeButton({ post, posts, setPosts, isUserLoggedIn,loggedInUserId}) {
	const [likes, setLikes] = useState();
	// Liked is set to false on default since the liked button should appear unselected unless clicked or previously selected
	const [liked, setLiked] = useState(false);

	// I'm setting my setLiked state in the useEffect since I want to rendered the button as liked already if the user in the databased has liked the post and 
	//in each post the logged in user has their name in the reactions array
	useEffect(() => {
		const reactionsLength = post.reactions.length;
		setLikes(reactionsLength);
		setLiked(post.reactions.includes(loggedInUserId));
		// this setLiked state is mounted and render if the post component has a changed to their arrays
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
			? post.reactions.filter((id) => id !== loggedInUserId) // if so remove user ID if they clicked on it again
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

		// Fetch after backend update and only if there is a backend update, the updated posts data. This cannot be inside of a useEffect as it would create an infinite loop.
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