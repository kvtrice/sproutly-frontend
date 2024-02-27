import React, { useState, useEffect } from 'react'
import { BsSortDownAlt } from "react-icons/bs"; // Oldest to Newest
import { BsSortDown } from "react-icons/bs"; // Newest to Oldest
import "./SortFilter.css";

function SortFilter({
	posts,
	setPosts
}) {
	const [sortOrder, setSortOrder] = useState("ascending");
	// const [sortedPosts, setSortedPosts] = useState([])

	console.log(setPosts)
	console.log(posts)
	// Update the sortedPosts when the sortOrder ot filtered plantTags Changes
	useEffect(() => {
		const sortedData = [...posts].sort((a, b) => {
			if (sortOrder === "ascending") {
				return (
					new Date(a.createdDateTime) - new Date(b.createdDateTime)
				);
			} else {
				return (
					new Date(b.createdDateTime) - new Date(a.createdDateTime)
				);
			}
		});
		setPosts(sortedData); // Update the parent component's posts
	}, [sortOrder]);

	const toggleSortOrder = () => {
		setSortOrder((prevOrder) =>
			prevOrder === "ascending" ? "descending" : "ascending"
		);
	};

	return (
		<div>
			<button onClick={toggleSortOrder} className='sort-button-container'>
				{sortOrder === "descending" ? (
					<div className='sort-button'>
						<BsSortDownAlt size={20} className='sort-icon'/>
						<p className='sort-text'>Oldest to Newest</p>
					</div>
				) : (
					<div className='sort-button'>
						<BsSortDown size={20} className='sort-icon'/>
						<p className='sort-text'>Newest to Oldest</p>
					</div>
				)}
			</button>
		</div>
	);
}

export default SortFilter