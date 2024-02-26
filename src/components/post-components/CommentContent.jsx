import React from "react";
import "./CommentContent.css"

const CommentContent = ({
	content,
	setContent,
	isUploadShowing
}) => {
	
	return (
		<div className="field">
			<div className="control comment-control">
				<textarea
					className="textarea"
					placeholder="Start typing here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={isUploadShowing ? 3 : 1}
				></textarea>
			</div>
		</div>
	);
};

export default CommentContent;
