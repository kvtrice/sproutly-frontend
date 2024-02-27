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
import { jwtDecode } from "jwt-decode";

function App() {
	// State to handle dark mode
	const [isDark, setIsDark] = useLocalStorage("isDark", false);
	const [loggedInUserId, setLoggedInUserId] = useState("");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [loggedInUserPictureUrl, setLoggedInUserPictureUrl] = useState(
		"https://pics.craiyon.com/2023-07-02/fa5dc6ea1a0d4c6fa9294b54c6edf1e9.webp"
	);

	// Update the background for root element for the entire application (HTML tag)
	useEffect(() => {
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light"
		);
	}, [isDark]);

	// State to handle selected plant tags
	// Required by Navbar, AllThreads, CreatePost, EditPost & CreateUser Components
	const [selectedPlantTags, setSelectedPlantTags] = useState([]);

	// Get the userId from the token in Session Storage, and set it in state. Only update it if the token changes (ie. new login occurs)
	useEffect(() => {
		// I have honestly try to use const and try to do const user_id = try {} but it hasn't worked for me in order to use the jwtDecode.
		// I know we shouldn't have a try block without an error message but it's not an error really, the try block is there so it doesn't crash when there is no token present.
		// I don't want the user to really see that no token present/ should be a string error message hence why I'm leaving ny catch empty.
		let user_Id;
		// It has to be in a try block since if token is null and user are not logged in yet it will throw an error directly and break the page
		try {
			const token = sessionStorage.getItem("user_id");
			user_Id = jwtDecode(token).user_id;
			setLoggedInUserId(user_Id);
		} catch (error) {}
	}, [sessionStorage.getItem("user_id")]);

	const fetchLoggedInUserData = async (loggedInUserId) => {
		const res = await fetch(
			`https://sproutly-api.onrender.com/users/${loggedInUserId}`
		);
		const userData = await res.json();
		return userData;
	};

	// Fetch user data for the logged in suers profile image
	useEffect(() => {
		// Check if loggedInUserId is set before fetching the user data
		if (loggedInUserId) {
			fetchLoggedInUserData(loggedInUserId)
				.then((data) => {
					setLoggedInUserPictureUrl(data.profilePicture);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
		}
	}, [loggedInUserId]);

	// Set isUserLoggedIn to true if the userId is set
	const handleLoggedIn = (loggedInUserId) => {
		if (loggedInUserId) {
			setIsUserLoggedIn(true);
		}
	};

	useEffect(() => {
		handleLoggedIn(loggedInUserId);
	}, [loggedInUserId]);

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
								loggedInUserPictureUrl={loggedInUserPictureUrl}
								isUserLoggedIn={isUserLoggedIn}
								loggedInUserId={loggedInUserId}
							/>
						}
					/>
					<Route
						path="/register"
						element={
							<RegisterUser
								isDark={isDark}
								setIsDark={setIsDark}
								loggedInUserPictureUrl={loggedInUserPictureUrl}
								isUserLoggedIn={isUserLoggedIn}
								loggedInUserId={loggedInUserId}
							/>
						}
					/>
					<Route
						path="/login"
						element={
							<Login
								isDark={isDark}
								setIsDark={setIsDark}
								loggedInUserPictureUrl={loggedInUserPictureUrl}
								isUserLoggedIn={isUserLoggedIn}
								loggedInUserId={loggedInUserId}
							/>
						}
					/>
					<Route path="/user">
						<Route
							path=":user_id/edit"
							element={
								<EditUserDetails
									isDark={isDark}
									setIsDark={setIsDark}
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
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
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
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
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
								/>
							}
						/>
						<Route
							path=":parentID"
							element={
								<ThreadPage
									isDark={isDark}
									setIsDark={setIsDark}
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
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
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
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
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
									isUserLoggedIn={isUserLoggedIn}
									loggedInUserId={loggedInUserId}
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
