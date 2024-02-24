import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DisplayComments from './post-components/DisplayComments'
import DisplayParent from './post-components/DisplayParent'
import AddComment from './post-components/AddComment'
import NavBar from "./NavBar";
import DeleteCommentWarning from './post-components/DeleteCommentWarning'


function ThreadPage({ isDark, setIsDark }) {
	const { parentID } = useParams();
	const [posts, setPosts] = useState([]);
	const [commentToDelete, setCommentToDelete] = useState("");
	const [isDeleteShowing, setIsDeleteShowing] = useState(false);

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
			<NavBar isDark={isDark} setIsDark={setIsDark} />
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
					isDeleteShowing={isDeleteShowing}
					setIsDeleteShowing={setIsDeleteShowing}
					setCommentToDelete={setCommentToDelete}
				/>
				<AddComment parentID={parentID} />
				{isDeleteShowing && (
					<DeleteCommentWarning
						setIsDeleteShowing={setIsDeleteShowing}
						commentToDelete={commentToDelete}
					/>
				)}
			</div>
		</div>
	);
}

export default ThreadPage