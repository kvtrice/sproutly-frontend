import React from "react";
import "./CommentContent.css"

const CommentContent = ({ content, setContent }) => {
	return (
		<div className="field">
			<div className="control">
				<textarea
					className="textarea"
					placeholder="Start typing here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
                    rows="1"
				></textarea>
			</div>
		</div>
	);
};

export default CommentContent;
