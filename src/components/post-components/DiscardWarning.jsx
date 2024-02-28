import React from "react";
import { useNavigate } from "react-router-dom";
import './DiscardWarning.css'

const DiscardWarning = ({
	setIsDiscardShowing,
    setTitle = () => {},
    setContent = () => {},
    setImageUrl = () => {},
    setSelectedPlantTags = () => {}
}) => {
    const nav = useNavigate()

	const handleConfirm = () => {
		// Clear all entry fields that have been entered
		setTitle("");
		setContent("");
		setImageUrl("");
		setSelectedPlantTags([]);
		setIsDiscardShowing(false);
		// Navigate back to the previous page
		nav(-1);
	};

	const handleCancel = () => {
		// Hide the discard warning if the user cancels their discard
		setIsDiscardShowing(false);
	};

	return (
		<div className="modal is-active">
			<div className="modal-background discard-bg">
                <div className="modal-content discard-container">
                    <div className="discard-text">
                        Are you sure you want to discard your post? All content will be
                        deleted.
                    </div>
                    <div className="discard-buttons">
                        <button className="button is-light" onClick={handleCancel}>No, go back</button>
                        <button className="button is-danger" onClick={handleConfirm}>Yes, discard</button>
                    </div>
                </div>
            </div>
		</div>
	);
};

export default DiscardWarning;
