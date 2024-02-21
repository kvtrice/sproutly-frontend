import React, { useState, useEffect } from 'react'
import UserDetails from './User'
import DatePost from './Date'
import TextPost from './Text'
import ImagePost from './Image'
import LikeButton from './Reaction'
import CommentsCount from './Comments'
import './Allthread.css'

async function fetchPostData() {
  const response = await fetch('http://localhost:4001/posts/')
  const data = await response.json()
  return data
}

function Allthread() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPostData().then((data) => {
      setPosts(data)
    })
  }, [])

  const addLike = async (postId) => {
    const postIndex = posts.findIndex(post => post._id === postId)
    const post = posts[postIndex]
    const updatedReactions = [...post.reactions, '65d2f5665305d3958a7ee6e8']

    // update the backend with the updated reactions
    await fetch(`http://localhost:4001/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reactions: updatedReactions }),
    })

    // fetch the updated post data
    const response = await fetch(`http://localhost:4001/posts/${postId}`)
    const updatedPost = await response.json()

    // pdate the posts state with the updated post
    const updatedPosts = [...posts]
    updatedPosts[postIndex] = updatedPost
    setPosts(updatedPosts)
  }

  return (
    <div className="thread-wrapper">
      {posts.map((post) => (
        <div key={post._id}>
          {post.isThreadStarter && (
            <>
              <UserDetails post={post} />
              <DatePost post={post} />
              <TextPost post={post} />
              <ImagePost post={post} />
              <LikeButton post={post} addLike={addLike} />
              <CommentsCount parentID={post._id} posts={posts}  />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Allthread