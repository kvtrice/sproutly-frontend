import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import { useEffect, useState } from "react";
import LikeButton from './src/alice-components/Reaction.jsx'
import CommentsCount from "./src/alice-components/Comments.jsx";
import TextPost from "./src/alice-components/Text.jsx";
import ImagePost from "./src/alice-components/Image.jsx";
import DatePost from "./src/alice-components/Date.jsx";
import ImageUpload from "./src/components/ImageUpload.jsx";
import UserDetails from './src/alice-components/User';

function App() {
	// State for Posts
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://127.0.0.1:4001/posts")
			.then((response) => response.json())
			.then((data) => setPosts(data));
	}, []);

	// Create Post function
	async function addPost(title, content, image, tags) {
		// Defined new post data
		const newPost = {
			user: "65d2e1373d8e4dc65b2338b2",
			title: title,
			content: content,
			image: image,
			parentID: null,
			isThreadStarter: false,
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

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/post" element={
						<>
							<UserDetails />
							<DatePost/>
							<TextPost/>
							<ImagePost/>
							<LikeButton/>
							<CommentsCount/>
						</>
						}/>
					  <Route
							path="new"
							element={<CreatePost addPost={addPost}/>}
						/>
					<Route/> 
					<Route path="/upload" element={<ImageUpload />} />
				</Routes>
			</BrowserRouter>
			
		</>
	);
}

export default App
