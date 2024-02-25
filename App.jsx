import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import ThreadPage from './src/components/ThreadPage'
import EditPost from "./src/components/post-components/EditPost";
import EditComment from "./src/components/post-components/EditComment";
import useLocalStorage from "use-local-storage";
import { useState, useEffect } from "react";
import RegisterUser from "./src/components/RegisterUser";
import Login from "./src/components/Login";
import ProfilePage from "./src/components/ProfilePage";
import EditUserDetails from "./src/components/UserEdit";

function App() {
	// State to handle dark mode
	const [isDark, setIsDark] = useLocalStorage("isDark", false);

	// Update the background for root element for the entire application (HTML tag)
	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light"
		);
	}),
		[isDark];

	// State to handle selected plant tags
	// Required by Navbar, AllThreads, CreatePost, EditPost & CreateUser Components
	const [selectedPlantTags, setSelectedPlantTags] = useState([]);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								isDark={isDark}
								setIsDark={setIsDark}
								selectedPlantTags={selectedPlantTags}
								setSelectedPlantTags={setSelectedPlantTags}
							/>
						}
					/>
					<Route
						path="/register"
						element={
							<RegisterUser
								isDark={isDark}
								setIsDark={setIsDark}
							/>
						}
					/>
					<Route
						path="/login"
						element={
							<Login isDark={isDark} setIsDark={setIsDark} />
						}
					/>
					<Route path="/user">
						<Route
							path=":user_id/edit"
							element={
								<EditUserDetails
									isDark={isDark}
									setIsDark={setIsDark}
								/>
							}
						/>
						<Route
							path=":user_id"
							element={
								<ProfilePage
									isDark={isDark}
									setIsDark={setIsDark}
									selectedPlantTags={selectedPlantTags}
									setSelectedPlantTags={setSelectedPlantTags}
								/>
							}
						/>
					</Route>
					<Route path="/post">
						<Route
							path="new"
							element={
								<CreatePost
									selectedPlantTags={selectedPlantTags}
									setSelectedPlantTags={setSelectedPlantTags}
									isDark={isDark}
									setIsDark={setIsDark}
								/>
							}
						/>
						<Route
							path=":parentID"
							element={
								<ThreadPage
									isDark={isDark}
									setIsDark={setIsDark}
								/>
							}
						/>
						<Route
							path=":postId/edit"
							element={
								<EditPost
									selectedPlantTags={selectedPlantTags}
									setSelectedPlantTags={setSelectedPlantTags}
									isDark={isDark}
									setIsDark={setIsDark}
								/>
							}
						/>
					</Route>
					<Route path="/comment">
						<Route
							path=":commentId/edit"
							element={
								<EditComment
									isDark={isDark}
									setIsDark={setIsDark}
								/>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App
