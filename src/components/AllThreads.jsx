import React, { useState, useEffect } from 'react'
import DisplayPost from './post-components/DisplayPost.jsx'
import SortFilter from "./post-components/SortFilter.jsx"
import PostSomethingCta from './PostSomethingCta'
import { ThreeDots } from "react-loading-icons";

function AllThreads({
	selectedPlantTags,
	setSelectedPlantTags,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) {
	const [posts, setPosts] = useState([]);
	const [filteredPostsByTag, setFilteredPostsByTag] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// declaring my fetch function as async since we don't know how long the api call will take
	async function fetchAllPostData() {
		const response = await fetch(
			"https://sproutly-api.onrender.com/posts/"
		);
		const data = await response.json();
		return data;
	}

	/// putting my fetch function into a useEffect and setting the useEffect with an empty array dependency to prevent infinite looping of fetching
	// Set posts based on the fetched data
	useEffect(() => {
		setIsLoading(true);
		fetchAllPostData().then((data) => {
			setPosts(data);
			setIsLoading(false);
		});
	}, []);

	// Filter posts based on plant tags
	useEffect(() => {
		// Filter the posts based on the selected plant tags
		const filtered = posts.filter((post) => {
			// Match if any of the selected plant tags are present in the post tags
			return selectedPlantTags.some((tag) => post.tags.includes(tag));
		});
		setFilteredPostsByTag(filtered);
	}, [selectedPlantTags, posts]);

	return (
		<div className="page-wrapper">
			<SortFilter posts={posts} setPosts={setPosts} />
			<div>
				{isUserLoggedIn ? (
					<PostSomethingCta
						loggedInUserPictureUrl={loggedInUserPictureUrl}
					/>
				) : (
					""
				)}
			</div>
			<div>
				{isLoading ? (
					<div className="home-loader">
						<div className="home-loading-container">
							<ThreeDots fill="#B7E4C7" size={20} />
						</div>
						<p>Page loading, this should only be a few moments</p>
					</div>
				) : (
					<div>
						{filteredPostsByTag.length > 0
							? filteredPostsByTag.map((post) => (
									<div key={post._id}>
										{post.isThreadStarter && (
											<DisplayPost
												posts={posts}
												setPosts={setPosts}
												post={post}
												isUserLoggedIn={isUserLoggedIn}
												loggedInUserId={loggedInUserId}
											/>
										)}
									</div>
							  ))
							: posts.map((post) => (
									<div key={post._id}>
										 {/* only give to the DisplayPost component posts objects that are threadstarter since this is the home page and we dont want to display comments out of the context 
										 of the single ThreadPage in the home page*/}
										{post.isThreadStarter && (
											<DisplayPost
												posts={posts}
												setPosts={setPosts}
												post={post}
												isUserLoggedIn={isUserLoggedIn}
												loggedInUserId={loggedInUserId}
											/>
										)}
									</div>
							  ))}
					</div>
				)}
			</div>
		</div>
	);
}



export default AllThreads