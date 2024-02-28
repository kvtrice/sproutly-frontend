import React, { useState, useEffect } from 'react'
import UserLikes from './user-components/Userlikes'
import DisplayPost from './post-components/DisplayPost'
import UserData from './user-components/Userdata'
import { useParams } from 'react-router-dom'
import NavBar from "./NavBar";
import "./ProfilePage.css";


//For the profile page I need to do grab two sets of data my user data and my posts data since the page display a history of a user post
async function Allpostdata() {
	const response = await fetch("https://sproutly-api.onrender.com/posts/");
	const data = await response.json();
	return data;
}

async function Alluserdata() {
	const response = await fetch("https://sproutly-api.onrender.com/users/");
	const userData = await response.json();
	return userData;
}

// grabbing the props passed from the app.jsx
function ProfilePage({
	isDark,
	setIsDark,
	setSelectedPlantTags,
	selectedPlantTags,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) 
	/// putting my fetch into a useEffect and setting the useEffect with an empty array dependency to prevent infinite looping of fetching
{
	useEffect(() => {
		Allpostdata()
			.then((data) => {
				// once the fetch occurs and promise is return set the return of the fetch to Setposts so that Posts becomes my post objects from the api fetching.
				setPosts(data);
				return Alluserdata(); // Chain the next promise
			})
			.then((userData) => {
				// once the fetch occurs and promise is return set the return of the fetch to setUsers so that User becomes my user objects from the api fetching.
				setUsers(userData);
			});
	}, []);

	const { user_id } = useParams();
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);

	return (
		<div>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
			<div className="page-wrapper">
				<div className="component-wrapper profile-wrapper">
					<h2>User Profile</h2>
					<hr />
					<div className="profile-header">
						<UserData users={users} user_id={user_id} />
						<UserLikes posts={posts} user_id={user_id} />
					</div>
				</div>
				<div className="component-wrapper">
					<h2>Post History</h2>
					<hr />
					{/* only give to the DisplayPost component posts objects that are threadstarter and belong to that specific user that we are rendeering the profile page of */}
					{posts.filter(
						(post) =>
							post.isThreadStarter && post.user._id === user_id
					).length === 0 ? (
						<p className="empty-text">No posts yet</p>
					) : (
						posts.map((post) => (
							<div key={post._id}>
								{post.isThreadStarter &&
									post.user._id === user_id && (
										<>
											<DisplayPost
												post={post}
												posts={posts}
												setPosts={setPosts}
											/>
											<hr />
										</>
									)}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export default ProfilePage