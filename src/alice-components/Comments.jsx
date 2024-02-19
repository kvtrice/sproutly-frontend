import React, { useState, useEffect } from 'react'

async function fetchPostData() {
    const response = await fetch(`http://localhost:4001/posts/`)
    const data = await response.json()
    return data
}

function CommentsCount() {
    const [comments, setComments] = useState()

    useEffect(() => {
        fetchComments()
    }, [])

    // For testing purposes, hardcoded an existing postID 
    const parentID = '65d2f5665305d3958a7ee6ed'

    const fetchComments = async () => {
        const data = await fetchPostData()
        const commentsWithParentID = data.filter(item => item.parentID === parentID)
        setComments(commentsWithParentID.length)
    }

    return (
        <a href="the thread posts link">{comments} comments </a>
    )
}

export default CommentsCount