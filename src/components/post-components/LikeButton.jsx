import React, { useState, useEffect } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import {jwtDecode} from 'jwt-decode'
import "./LikeButton.css";

function LikeButton({ post, posts, setPosts, isUserLoggedIn }) {
	const [likes, setLikes] = useState();
	const [liked, setLiked] = useState(false);

	const token = sessionStorage.getItem("user_id");

	// I have honestly try to use const and try to do const user_id = try {} but it hasn't worked for me in order to use the jwtDecode.
	// I know we shouldn't have a try block without an error message but it's not an error really, the try block is there so it doesn't crash when there is no token present.
	// I don't want the user to really see that no token present/ should be a string error message hence why I'm leaving ny catch empty.
	let user_Id;
	// it has to be in a try block since if token is null and user are not logged in yet it will throw an error directly and break the page
	try {
		user_Id = jwtDecode(token).user_id;
		console.log(user_Id);
	} catch (error) {}

	useEffect(() => {
		const reactionsLength = post.reactions.length;
		setLikes(reactionsLength);
		setLiked(post.reactions.includes(user_Id));
	}, [post]);

	const handleAddLike = async () => {
		await addLike(post._id, user_Id);
	};

	// Add like function
	const addLike = async (postId, user_Id) => {
		const postIndex = posts.findIndex((post) => post._id === postId);
		const post = posts[postIndex];

		// Check if user ID exists in reactions
		const updatedReactions = post.reactions.includes(user_Id)
			? post.reactions.filter((id) => id !== user_Id) // Remove user ID
			: [...post.reactions, user_Id];

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