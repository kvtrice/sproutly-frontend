import React, { useState, useEffect } from 'react'
import UserLikes from './Userlikes'
import DisplayPost from '../post-components/DisplayPost'

async function Allpostdata() {
  const response = await fetch('http://localhost:4001/posts/')
  const data = await response.json()
  return data
}

function ProfilePage() {
  useEffect(() => {
    Allpostdata().then((data) => {
      setPosts(data)
    })
  }, [])

  // hard code for testing purpose, this will come eventually from the params 
  const user_id ="65d469278aaa81f8f6af8497"
  const [posts, setPosts] = useState([])

return (
  <div>
    <UserLikes posts={posts} user_id= {user_id} />
    {posts.map((post) => (
      <div key={post._id}>
        {post.isThreadStarter && post.user._id === user_id && (
          <>
            <DisplayPost post={post} posts={posts} setPosts={setPosts} />
          </>
        )}
      </div>
    ))}
  </div>
)
}

export default ProfilePage