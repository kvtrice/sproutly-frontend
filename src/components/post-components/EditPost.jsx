import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePost.css";
import PlantSearch from "../PlantSearch";
import ImageUpload from "../ImageUpload";
import DiscardWarning from "./DiscardWarning";
import NavBar from "../NavBar";
import PostContent from "./PostContent";

const EditPost = ({ selectedPlantTags, setSelectedPlantTags }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isDiscardShowing, setIsDiscardShowing] = useState(false);
	const nav = useNavigate();
	const { postId } = useParams();

	// Fetch the details of the selected post
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(
				`http://127.0.0.1:4001/posts/${postId}`
			);
			const post = await response.json();
			setTitle(post.title || "");
			setContent(post.content || "");
			setImageUrl(post.image || "");
			setSelectedPlantTags(post.tags || []);
		};

		fetchPost();
	}, [postId]);

	// Edit Post Function
	const editPost = async (postId, title, content, imageUrl, selectedPlantTags) => {

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
				`http://127.0.0.1:4001/posts/${postId}`,
				{
					method: "PUT",
					headers: {
						"content-Type": "application/json",
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

	const handleUpdatePost = async (e) => {
		e.preventDefault();
        await editPost(postId, title, content, imageUrl, selectedPlantTags)
		// Navigate to the URL or the updated post if successfully updated
		nav(`/post/${postId}`);
	};

	// Discard warning handler
	const displayDiscardWarning = () => {
		setIsDiscardShowing(true);
	};

	return (
		<>
			<NavBar />
			<div className="page-wrapper has-navbar-fixed-top">
				<div className="form-wrapper">
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
						<div className="post-content">
							<PostContent
								setContent={setContent}
								content={content}
							/>
						</div>
						<div className="upload-image">
							<ImageUpload setImageUrl={setImageUrl} initialImageUrl={imageUrl} />
						</div>
						<div className="search">
							<PlantSearch
								setSelectedPlantTags={setSelectedPlantTags}
                                selectedPlantTags={selectedPlantTags}
							/>
						</div>
						<div className="field is-grouped is-grouped-right">
							<p className="control">
								<a
									className="button is-danger"
									onClick={displayDiscardWarning}
								>
									Discard
								</a>
							</p>
							<div className="control">
								<input
									className="button"
									type="submit"
									value="Submit"
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
