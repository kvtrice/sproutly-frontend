import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePost.css";
import PlantSearch from "../PlantSearch";
import ImageUpload from "../ImageUpload";
import DiscardWarning from "./DiscardWarning";
import NavBar from "../NavBar";
import PostContent from "./PostContent";

const EditPost = ({
	selectedPlantTags,
	setSelectedPlantTags,
	setIsDark,
	isDark,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isDiscardShowing, setIsDiscardShowing] = useState(false);
	const nav = useNavigate();
	// use params to get the postID of the post
	const { postId } = useParams();

	// Fetch the details of the selected post, trigger on mount and if the postId changes
	useEffect(() => {
		const fetchPost = async () => {
			// fetch URL based on the params
			const response = await fetch(
				`https://sproutly-api.onrender.com/posts/${postId}`
			);
			const post = await response.json();
			// Set all fields to display the current / existing data
			setTitle(post.title || "");
			setContent(post.content || "");
			setImageUrl(post.image || "");
			setSelectedPlantTags(post.tags || []);
		};

		fetchPost();
	}, [postId]);

	// Edit Post Function
	const editPost = async (
		postId,
		title,
		content,
		imageUrl,
		selectedPlantTags
	) => {
		// Defined updated post data
		const updatedPost = {
			title: title,
			content: content,
			image: imageUrl,
			tags: selectedPlantTags,
		};

		// POST the updated post to API
		try {
			const result = await fetch(
				`https://sproutly-api.onrender.com/posts/${postId}`,
				{
					method: "PUT",
					headers: {
						"content-Type": "application/json",
						Authorization: `Bearer ${sessionStorage.getItem(
							"user_id"
						)}`,
					},
					body: JSON.stringify(updatedPost),
				}
			);

			if (!result.ok) {
				throw new Error("Failed to update post!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Update post handle
	const handleUpdatePost = async (e) => {
		e.preventDefault();
		// Call the editpost function
		await editPost(postId, title, content, imageUrl, selectedPlantTags);
		// Navigate to the URL of the updated post if successfully updated
		nav(`/post/${postId}`);
	};

	// Discard warning handler
	const displayDiscardWarning = () => {
		setIsDiscardShowing(true);
	};

	return (
		<>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
			<div className="page-wrapper has-navbar-fixed-top">
				<div className="component-wrapper">
					<h2>Edit Post</h2>
					<form className="section" onSubmit={handleUpdatePost}>
						<div className="field">
							<div className="control">
								<input
									className="input is-normal"
									type="text"
									placeholder="Enter post title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								></input>
							</div>
						</div>
						{/* Post content component */}
						<div className="post-content">
							<PostContent
								setContent={setContent}
								content={content}
							/>
						</div>
						{/* Image upload component */}
						<div className="upload-image">
							<ImageUpload
								setImageUrl={setImageUrl}
								initialImageUrl={imageUrl}
							/>
						</div>
						{/* Plant search component */}
						<div className="search">
							<PlantSearch
								setSelectedPlantTags={setSelectedPlantTags}
								selectedPlantTags={selectedPlantTags}
							/>
						</div>
						{/* Action Buttons - Discard / Submit */}
						<div className="field is-grouped is-grouped-right">
							<p className="control">
								<a
									className="button is-light"
									onClick={displayDiscardWarning}
								>
									Discard
								</a>
							</p>
							<div className="control">
								<input
									className="button is-primary"
									type="submit"
									value="Save"
								></input>
							</div>
						</div>
					</form>
				</div>

				{/* Discard Warning */}
				<div>
					{isDiscardShowing && (
						<DiscardWarning
							setIsDiscardShowing={setIsDiscardShowing}
							setTitle={setTitle}
							setContent={setContent}
							setImageUrl={setImageUrl}
							setSelectedPlantTags={setSelectedPlantTags}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default EditPost;
