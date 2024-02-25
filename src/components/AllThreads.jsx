import React, { useState, useEffect } from 'react'
import DisplayPost from './post-components/DisplayPost.jsx'
import SortFilter from "./post-components/SortFilter.jsx"
import PostSomethingCta from './PostSomethingCta'


function AllThreads({
	selectedPlantTags,
	setSelectedPlantTags,
	selectedPlants,
	setSelectedPlants,
}) {
	const [posts, setPosts] = useState([]);
	const [filteredPostsByTag, setFilteredPostsByTag] = useState([]);

	// Fetch all posts
	async function fetchAllPostData() {
		const response = await fetch("http://localhost:4001/posts/");
		const data = await response.json();
		return data;
	}

	// set posts based on the fetched data
	useEffect(() => {
		fetchAllPostData().then((data) => {
			setPosts(data);
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
			<PostSomethingCta />
			<div>
				{filteredPostsByTag.length > 0
					? filteredPostsByTag.map((post) => (
							<div key={post._id}>
								{post.isThreadStarter && (
									<DisplayPost
										posts={posts}
										setPosts={setPosts}
										post={post}
										setSelectedPlantTags={
											setSelectedPlantTags
										}
										selectedPlantTags={selectedPlantTags}
										selectedPlants={selectedPlants}
										setSelectedPlants={setSelectedPlants}
									/>
								)}
							</div>
					  ))
					: posts.map((post) => (
							<div key={post._id}>
								{post.isThreadStarter && (
									<DisplayPost
										posts={posts}
										setPosts={setPosts}
										post={post}
										setSelectedPlantTags={
											setSelectedPlantTags
										}
										selectedPlantTags={selectedPlantTags}
										selectedPlants={selectedPlants}
										setSelectedPlants={setSelectedPlants}
									/>
								)}
							</div>
					  ))}
			</div>
		</div>
	);
}



export default AllThreads