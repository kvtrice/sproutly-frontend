import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import PlantSearch from "../PlantSearch";
import ImageUpload from "../ImageUpload";

const CreatePost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [posts, setPosts] = useState([]);

	// Create Post function
	async function addPost(title, content, imageUrl, tags) {
		// Defined new post data
		const newPost = {
			user: "65d469278aaa81f8f6af8499",
			title: title,
			content: content,
			image: imageUrl,
			parentID: null,
			isThreadStarter: true,
			isComment: false,
			tags: tags,
		};

		// POST the new post to API
		const result = await fetch("http://127.0.0.1:4001/posts", {
			method: "POST",
			headers: {
				"content-Type": "application/json",
			},
			body: JSON.stringify(newPost),
		});

		const postData = await result.json();
		setPosts([...posts, postData]);
	}

	// Raise state up to parent component and pass down to PlanSearch component
	const [selectedPlantTags, setSelectedPlantTags] = useState([]);

	const nav = useNavigate()

	const createNewPost = async (e) => {
		e.preventDefault()
		await addPost(title, content, imageUrl, selectedPlantTags)
		// Clear post entry fields
		setTitle("")
		setContent("")
        setImageUrl("")
		setSelectedPlantTags("")

		// Navigate home after creation
		nav("/")
	};

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
								onChange={(e) => setTitle(e.target.value)}
							></input>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<textarea
								className="textarea"
								placeholder="Start typing here..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							></textarea>
						</div>
					</div>
					<div className="upload-image">
						<ImageUpload setImageUrl={setImageUrl} />
					</div>
					<div className="search">
						<PlantSearch setSelectedPlantTags={setSelectedPlantTags} />
					</div>
					<div className="field is-grouped is-grouped-right">
						<p className="control">
							<a className="button is-light">Discard</a>
						</p>
						<div className="control">
							<input
								className="button"
								type="submit"
								value="Submit"
							></input>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default CreatePost;
