import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import PlantSearch from "../PlantSearch";
import ImageUpload from "../ImageUpload";
import DiscardWarning from "./DiscardWarning";
import NavBar from "../NavBar";
import PostContent from "./PostContent";

const CreatePost = ({
	selectedPlantTags,
	setSelectedPlantTags,
	setIsDark,
	isDark,
}) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [posts, setPosts] = useState([]);
	const [isDiscardShowing, setIsDiscardShowing] = useState(false);

	const nav = useNavigate();

	// Add Post function
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

	// Create Post only if there's a minimmum of Title & Content entered (mandatory)
	const createNewPost = async (e) => {
		if (title && content) {
			e.preventDefault();
			await addPost(title, content, imageUrl, selectedPlantTags);
			// Clear post entry fields
			setTitle("");
			setContent("");
			setImageUrl("");
			setSelectedPlantTags("");
			// Navigate home after creation
			nav("/");
		}
	};

	// Discard warning handler
	const displayDiscardWarning = () => {
		setIsDiscardShowing(true);
	};

	return (
		<>
			<NavBar isDark={isDark} setIsDark={setIsDark} />
			<div className="page-wrapper">
				<div className="component-wrapper">
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
						<div className="post-content">
							<PostContent
								setContent={setContent}
								content={content}
							/>
						</div>
						<div className="upload-image">
							<ImageUpload setImageUrl={setImageUrl} />
						</div>
						<div className="search">
							<PlantSearch
								setSelectedPlantTags={setSelectedPlantTags}
							/>
						</div>
						<div className="field is-grouped is-grouped-right">
							<p className="control">
								<a
									className="button is-light"
									onClick={displayDiscardWarning}
								>
									Discard
								</a>
							</p>
							<div>
								<input
									className="button is-primary"
									type="submit"
									value="Submit"
								></input>
							</div>
						</div>
					</form>
				</div>

				{/* Discard Warning */}
				<div>
					{isDiscardShowing && (
						<DiscardWarning
							setIsDiscardShowing={setIsDiscardShowing}
							setTitle={setTitle}
							setContent={setContent}
							setImageUrl={setImageUrl}
							setSelectedPlantTags={setSelectedPlantTags}
						/>
					)}
				</div>
			</div>
		</>
	);
};
export default CreatePost;
