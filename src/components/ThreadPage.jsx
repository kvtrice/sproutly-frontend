import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DisplayComments from './post-components/DisplayComments'
import DisplayParent from './post-components/DisplayParent'
import AddComment from './post-components/AddComment'
import NavBar from "./NavBar";


function ThreadPage() {
	const { parentID } = useParams();
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

	return (
		<div>
			<NavBar />
			<div className="page-wrapper">
				<DisplayParent
					parentID={parentID}
					posts={posts}
					setPosts={setPosts}
				/>
				<DisplayComments
					parentID={parentID}
					posts={posts}
					setPosts={setPosts}
				/>
				<AddComment parentID={parentID} />
			</div>
		</div>
	);
}

export default ThreadPage