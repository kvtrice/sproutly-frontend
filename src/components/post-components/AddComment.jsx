import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommentContent from "./CommentContent";
import { IoMdSend } from "react-icons/io";
import "./AddComment.css";
import ImageUpload from "../ImageUpload";

const AddComment = ({ parentID, loggedInUserId }) => {
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [posts, setPosts] = useState([]);
	const [isUploadShowing, setIsUploadShowing] = useState(false);
	const [error, setError] = useState("");
	const commentWrapperRef = useRef(null);
	const nav = useNavigate()

	const handleReturnToParent = () => {
		nav(`/post/${parentID}`)
	}

	// Add Comment function
	async function addComment(content, imageUrl) {
		// Defined new comment data
		const newComment = {
			user: loggedInUserId,
			title: null,
			content: content,
			image: imageUrl,
			parentID: parentID,
			isThreadStarter: false,
			isComment: true,
			tags: [],
		};

		// POST the new comment to API
		const result = await fetch("https://sproutly-api.onrender.com/posts", {
			method: "POST",
			headers: {
				"content-Type": "application/json",
				"Authorization": `Bearer ${sessionStorage.getItem('user_id')}`
			},
			body: JSON.stringify(newComment),
		});

		if (result.ok) {
			const commentData = await result.json();
			setPosts([...posts, commentData]);
		} else {
			throw new Error("Failed to add comment")
		}
	}

	// Create Comment only if there's some Content entered (mandatory)
	const createNewComment = async (e) => {
		if (content) {
			e.preventDefault();
			await addComment(content, imageUrl);
			// Clear post entry fields
			setContent("");
			setImageUrl("");
			setError("")
			setIsUploadShowing(false)
			handleReturnToParent()
		} else {
			setError("Comment must contain text");
		}
	};

	// Event listener to handle clicks outside Add Comment component - collapses it
	const handleClickOutside = (event) => {
		if (!event.target.closest(".add-comment-wrapper")) {
			setIsUploadShowing(false);
			setError('')
		}
	};

	// Attaches the handleClickOutside event listener when the Add Comment component mounts
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="add-comment-wrapper"
			ref={commentWrapperRef}
			onClick={() => setIsUploadShowing(true)}
		>
			<div className="comment-elements">
				<div className="always-visible">
					<CommentContent
						content={content}
						setContent={setContent}
						setIsUploadShowing={setIsUploadShowing}
						isUploadShowing={isUploadShowing}
					/>
					<div className="send-icon-container">
						<IoMdSend
							className="send-icon"
							size={25}
							onClick={createNewComment}
						/>
					</div>
				</div>
				<div className="error-container">{error && <p className="error-message">{error}</p>}</div>
				{isUploadShowing ? (
					<div className="add-image-to-comment-container">
						<ImageUpload
							onClick={(e) => e.preventDefault()}
							setImageUrl={setImageUrl}
							setIsUploadShowing={setIsUploadShowing}
							isUploadShowing={isUploadShowing}
						/>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default AddComment;
