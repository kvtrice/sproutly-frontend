import React, { useState, useEffect } from 'react'
import UserLikes from './user-components/Userlikes'
import DisplayPost from './post-components/DisplayPost'
import UserData from './user-components/Userdata'
import { useParams } from 'react-router-dom'
import NavBar from "./NavBar";
import "./ProfilePage.css";

async function Allpostdata() {
	const response = await fetch("http://localhost:4001/posts/");
	const data = await response.json();
	return data;
}

async function Alluserdata() {
	const response = await fetch("http://localhost:4001/users/");
	const userData = await response.json();
	return userData;
}


function ProfilePage({
	isDark,
	setIsDark,
	setSelectedPlantTags,
	selectedPlantTags,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) {
	useEffect(() => {
		Allpostdata()
			.then((data) => {
				setPosts(data);
				return Alluserdata(); // Chain the next promise
			})
			.then((userData) => {
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
				<div className="component-wrapper profile-header">
					<UserData users={users} user_id={user_id} />
					<UserLikes posts={posts} user_id={user_id} />
				</div>
				<div className="component-wrapper">
					{posts.map((post) => (
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
					))}
				</div>
			</div>
		</div>
	);
}

export default ProfilePage