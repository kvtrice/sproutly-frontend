import React from "react";

const PostContent = ({ content, setContent }) => {
	return (
		<div className="field">
			<div className="control">
				<textarea
					className="textarea"
					placeholder="Start typing here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
                    rows="3"
				></textarea>
			</div>
		</div>
	);
};

export default PostContent;
