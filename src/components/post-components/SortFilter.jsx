import React, { useState, useEffect } from 'react'
import { BsSortDownAlt } from "react-icons/bs"; // Oldest to Newest
import { BsSortDown } from "react-icons/bs"; // Newest to Oldest
import "./SortFilter.css";

function SortFilter({
	posts,
	setPosts
}) {
	// the default is ascending as it is the order that the posts come directly form the database, where the oldest post is the first object at index 0
	const [sortOrder, setSortOrder] = useState("ascending");
	// const [sortedPosts, setSortedPosts] = useState([])

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
		 // If the previous order was "ascending," set it to "descending"; otherwise, set it to "ascending.". This is the rendeering of the button option. 
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