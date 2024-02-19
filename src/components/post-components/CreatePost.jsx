import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
	return (
		<div className="page-wrapper">
			<div className="form-wrapper">
				<h2>New Post</h2>
				<form>
					<div className="field">
						<div className="control">
							<input
								className="input is-normal"
								type="text"
								placeholder="Enter post title"
							></input>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<textarea
								className="textarea"
								placeholder="Start typing here..."
							></textarea>
						</div>
					</div>
                    <div class="file">
                        <label class="file-label">
                            <input class="file-input" type="file" name="plant-image" />
                            <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Upload image
                            </span>
                            </span>
                        </label>
                    </div>
					<div class="field is-grouped is-grouped-right">
						<p class="control">
							<a class="button is-light">Discard</a>
						</p>
						<p class="control">
							<a class="button is-primary">Create Post</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};
export default CreatePost;
