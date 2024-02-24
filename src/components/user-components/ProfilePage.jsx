import React, { useState, useEffect } from 'react'
import UserLikes from './Userlikes'
import DisplayPost from '../post-components/DisplayPost'
import UserData from './Userdata'
import { useParams } from 'react-router-dom'

async function Allpostdata() {
  const response = await fetch('http://localhost:4001/posts/')
  const data = await response.json()
  return data
}

async function Alluserdata() {
  const response = await fetch('http://localhost:4001/users/')
  const userData = await response.json()
  return userData
}



function ProfilePage() {
  useEffect(() => {
    Allpostdata()
      .then((data) => {
        setPosts(data)
        return Alluserdata() // Chain the next promise
      })
      .then((userData) => {
        setUsers(userData)
      })
  }, [])

  const {user_id} = useParams()
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  return (
    <div>
      <UserLikes posts={posts} user_id={user_id} />
      <UserData users={users} user_id={user_id} />
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