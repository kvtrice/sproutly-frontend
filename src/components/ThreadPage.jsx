import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DisplayComments from './post-components/DisplayComments'
import DisplayParent from './post-components/DisplayParent'
import AddComment from './post-components/AddComment'
import NavBar from "./NavBar";
import DeleteCommentWarning from './post-components/DeleteCommentWarning'

// grabbing the props passed from the app.jsx
function ThreadPage({
	isDark,
	setIsDark,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) {
	const { parentID } =  useParams();
	const [posts, setPosts] = useState([]);
	const [commentToDelete, setCommentToDelete] = useState("")
	const [isDeleteShowing, setIsDeleteShowing] = useState(false)

	/// putting my fetch into a useEffect and setting the useEffect with an empty array dependency to prevent infinite looping of fetching
	useEffect(() => {
		fetchAllPostData()
			// once the fetch occurs and promise is return set the return of the fetch to Setposts so that Posts becomes my post objects from the api fetching.
			.then((data) => {setPosts(data)})
	}, [])

	// declaring my fetch function as async since we don't know how long the api call will take
	async function fetchAllPostData() {
		const response = await fetch("https://sproutly-api.onrender.com/posts/")
		const data = await response.json()
		return data
	}


// passing my props that I received from app.jsx to my child components that needs those props and passing my posts data from this page fetchAllPostData to the child components too.
	return (
		<div>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
			<div className="page-wrapper">
				<div>
					<div className="component-wrapper">
						<DisplayParent
							parentID={parentID}
							posts={posts}
							setPosts={setPosts}
							isUserLoggedIn={isUserLoggedIn}
							loggedInUserId={loggedInUserId}
						/>
					</div>
					<div className="component-wrapper">
						{isUserLoggedIn === false &&
						posts.filter((item) => item.parentID === parentID) <
							1 ? (
							<p className="empty-text">No comments yet. Login or Sign up to start commenting.</p>
						) : (
							<DisplayComments
								parentID={parentID}
								posts={posts}
								setPosts={setPosts}
								isDeleteShowing={isDeleteShowing}
								setIsDeleteShowing={setIsDeleteShowing}
								commentToDelete={commentToDelete}
								setCommentToDelete={setCommentToDelete}
								loggedInUserId={loggedInUserId}
								isUserLoggedIn={isUserLoggedIn}
							/>
						)}

						{isUserLoggedIn && (
							<AddComment
								parentID={parentID}
								loggedInUserId={loggedInUserId}
							/>
						)}
						{isDeleteShowing && (
							<DeleteCommentWarning
								setIsDeleteShowing={setIsDeleteShowing}
								commentToDelete={commentToDelete}
								setCommentToDelete={setCommentToDelete}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ThreadPage