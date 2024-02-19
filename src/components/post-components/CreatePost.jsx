import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = ({ addPost }) => {

    // const params = useParams()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const nav = useNavigate()

    const createNewPost = async (e) => {
        e.preventDefault()
        await addPost(title, content)
        // Clear post entry fields
        setTitle("")
        setContent("")
        // Navigate home after creation
        nav('/')
    }

	return (
		<div className="page-wrapper">
			<div className="form-wrapper">
				<h2>New Post</h2>
				<form className="section" onSubmit={createNewPost}>
					<div className="field">
						<div className="control">
							<input
								className="input is-normal"
								type="text"
								placeholder="Enter post title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
							></input>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<textarea
								className="textarea"
								placeholder="Start typing here..."
                                value={content}
                                onChange={e => setContent(e.target.value)}
							></textarea>
						</div>
					</div>
                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" name="plant-image" />
                            <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Upload image
                            </span>
                            </span>
                        </label>
                    </div>
					<div className="field is-grouped is-grouped-right">
						<p className="control">
							<a className="button is-light">Discard</a>
						</p>
						<div className="control">
                            <input class="button" type="submit" value="Submit"></input>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default CreatePost;
