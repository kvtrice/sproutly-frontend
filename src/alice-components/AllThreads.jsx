import React, { useState, useEffect } from 'react'
import DisplayPost from './DisplayPost'
import "./AllThreads.css"
import SortFilter from "./SortFilter"

function AllThreads({ isDark }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetchAllPostData().then((data) => {
			setPosts(data);
		});
	}, []);

	async function fetchAllPostData() {
		const response = await fetch("http://localhost:4001/posts/");
		const data = await response.json();
		return data;
	}

	const handleSortedPosts = (sortedData) => {
		setPosts(sortedData)
	  }

	  
	return (
		<div className="thread-wrapper">
			<SortFilter post={posts} setPosts={handleSortedPosts} /> 
			{posts.map((post) => (
				<div key={post._id}>
					{post.isThreadStarter && (
						<DisplayPost posts={posts} setPosts={setPosts} post={post} />
					)}
				</div>
			))}
		</div>
	);
}



export default AllThreads