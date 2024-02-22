import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DisplayComments from './DisplayComments'
import DisplayParent from './DisplayParent'


function ThreadPage() {
    const { parentID } = useParams()
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
		fetchAllPostData().then((data) => {
			setPosts(data)
		})
	}, [])

	async function fetchAllPostData() {
		const response = await fetch("http://localhost:4001/posts/");
		const data = await response.json()
		return data
	}

    return (
        <div>
			<DisplayParent parentID={parentID} posts={posts} setPosts={setPosts} />
            <DisplayComments parentID={parentID} posts={posts} setPosts={setPosts} />
        </div>
    )
}

export default ThreadPage