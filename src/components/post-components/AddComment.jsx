import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CommentContent from "./CommentContent";
import { IoMdSend } from "react-icons/io";
import "./AddComment.css";
import ImageUpload from "../ImageUpload";

const AddComment = ({ parentID }) => {
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [posts, setPosts] = useState([]);

	// Add Comment function
	async function addComment(content, imageUrl) {
		// Defined new comment data
		const newComment = {
			user: "65d469278aaa81f8f6af8499",
			title: null,
			content: content,
			image: imageUrl,
			parentID: parentID,
			isThreadStarter: false,
			isComment: true,
			tags: [],
		};

		// POST the new comment to API
		const result = await fetch("http://127.0.0.1:4001/posts", {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(newComment),
		});

		const commentData = await result.json();
		setPosts([...posts, commentData]);
	}

	// Create Comment only if there's some Content entered (mandatory)
	const createNewComment = async (e) => {
		if (content) {
			e.preventDefault();
			await addComment(content, imageUrl);
			// Clear post entry fields
			setContent("");
			setImageUrl("");

			// Reload page when posts change
			window.location.reload();
		}
	};

	return (
		<div className="add-comment-wrapper">
			<div className="comment-elements">
				<div className="always-visible">
					<CommentContent content={content} setContent={setContent} />
					<div className="send-icon-container">
						<IoMdSend
							className="send-icon"
							size={35}
							onClick={createNewComment}
						/>
					</div>
				</div>
				<div className="add-image-to-comment-container">
					<ImageUpload setImageUrl={setImageUrl} />
				</div>
			</div>
		</div>
	);
};

export default AddComment;
