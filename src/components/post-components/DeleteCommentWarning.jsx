import React from "react";
import "./DiscardWarning.css";

const DeleteCommentWarning = ({
	setIsDeleteShowing,
	commentToDelete,
	setCommentToDelete,
}) => {
	// Function to handle if a user confirms their choice to delete the comment
	const handleConfirm = () => {
		// Function to delete the comment
		const deleteComment = async () => {
			try {
				// Fetches the comment based on the commentID that's been passed through commetnToDelete (This comes from the EditCommentNavigation Component)
				const result = await fetch(
					`https://sproutly-api.onrender.com/posts/${commentToDelete}`,
					{
						method: "DELETE",
						headers: {
							"content-Type": "application/json",
							Authorization: `Bearer ${sessionStorage.getItem(
								"user_id"
							)}`,
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

		// Function to handle the deletion, reset state and reload the page (to display the thread with the comment now deleted)
		async function handleDelete() {
			await deleteComment();
			setCommentToDelete("");
			setIsDeleteShowing(false);

			// Reload page after deletion
			window.location.reload();
		}

		// Run the delete handler function
		handleDelete();
	};

	const handleCancel = () => {
		// Hide delete warning if the user cancels the delete
		setIsDeleteShowing(false);
	};

	return (
		<div className="modal is-active">
			<div className="modal-background discard-bg">
				<div className="modal-content discard-container">
					<div className="discard-text">
						Are you sure you want to delete your comment? This
						cannot be reversed.
					</div>
					<div className="discard-buttons">
						<button
							className="button is-light"
							onClick={handleCancel}
						>
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
