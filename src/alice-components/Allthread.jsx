import React, { useState, useEffect } from 'react'
import UserDetails from './User'
import DatePost from './Date'
import TextPost from './Text'
import ImagePost from './Image'
import LikeButton from './Reaction'
import CommentsCount from './Comments'

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

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          {post.isThreadStarter && (
            <>
              <UserDetails post={post} />
              <DatePost post={post} />
              <TextPost post={post} />
              <ImagePost post={post} />
              <LikeButton postId={post._id}  />
              <CommentsCount parentID={post._id} posts={posts}  />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Allthread