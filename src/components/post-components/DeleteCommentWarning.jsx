import React from "react";
import "./DiscardWarning.css";

const DeleteCommentWarning = ({ setIsDeleteShowing, commentToDelete, setCommentToDelete }) => {
    // Id ofthe comment the user is interacting with
	const commentId = commentToDelete;

	const handleConfirm = () => {
		const deleteComment = async (commentId) => {
			try {
				const result = await fetch(
					`https://sproutly-api.onrender.com/posts/${commentId}`,
					{
						method: "DELETE",
						headers: {
							"content-Type": "application/json",
							"Authorization": `Bearer ${sessionStorage.getItem('user_id')}`
						},
					}
				);

				if (!result.ok) {
					throw new Error("Failed to update comment!");
				}
			} catch (error) {
				console.error(error);
			}
		};

		async function handleDelete() {
			await deleteComment(commentId);
		}

		handleDelete();
		setCommentToDelete("")

		setIsDeleteShowing(false);
		// Reload page after deletion
		window.location.reload();
	};

	const handleCancel = () => {
		// Hide delete warning
		setIsDeleteShowing(false);
	};

	return (
		<div className="modal is-active">
			<div className="modal-background">
				<div className="modal-content discard-container">
					<div className="discard-text">
						Are you sure you want to delete your comment? This
						cannot be reversed.
					</div>
					<div className="discard-buttons">
						<button className="button" onClick={handleCancel}>
							No, go back
						</button>
						<button
							className="button is-danger"
							onClick={handleConfirm}
						>
							Yes, delete permanently
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteCommentWarning;
