import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreatePost.css";
import ImageUpload from "../ImageUpload";
import DiscardWarning from "./DiscardWarning";
import NavBar from "../NavBar";
import PostContent from "./PostContent";

const EditComment = ({ post, setIsDark, isDark }) => {
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isDiscardShowing, setIsDiscardShowing] = useState(false);
	const nav = useNavigate();

	const { commentId } = useParams();

	// Fetch the details of the selected comment
	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(
				`http://127.0.0.1:4001/posts/${commentId}`
			);
			const post = await response.json();
			setContent(post.content || "");
			setImageUrl(post.image || "");
		};

		fetchPost();
	}, [commentId]);

	// Edit comment Function
	const editComment = async (commentId, content, imageUrl) => {
		// Defined updated comment data
		const updatedComment = {
			content: content,
			image: imageUrl,
		};

		// POST the updated post to API
		try {
			const result = await fetch(
				`http://127.0.0.1:4001/posts/${commentId}`,
				{
					method: "PUT",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(updatedComment),
				}
			);

			if (!result.ok) {
				throw new Error("Failed to update comment!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdateComment = async (e) => {
		e.preventDefault();
		await editComment(commentId, content, imageUrl);
		// Navigate to the URL or the parent post if successfully updated
		nav(-1);
	};

	// Discard warning handler
	const displayDiscardWarning = () => {
		setIsDiscardShowing(true);
	};

	return (
		<>
			<NavBar 
			isDark={isDark} setIsDark={setIsDark} />
			<div className="page-wrapper has-navbar-fixed-top">
				<div className="form-wrapper">
					<h2>Edit Comment</h2>
					<form className="section" onSubmit={handleUpdateComment}>
						<div className="post-content">
							<PostContent
								setContent={setContent}
								content={content}
							/>
						</div>
						<div className="upload-image">
							<ImageUpload
								setImageUrl={setImageUrl}
								initialImageUrl={imageUrl}
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
							setContent={setContent}
							setImageUrl={setImageUrl}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default EditComment;
