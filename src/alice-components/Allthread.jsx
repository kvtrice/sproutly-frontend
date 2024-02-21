import React, { useState, useEffect } from 'react'
import UserDetails from './User'
import DatePost from './Date'
import TextPost from './Text'
import ImagePost from './Image'
import LikeButton from './Reaction'
import CommentsCount from './Comments'
import Filter from './Filter'

async function fetchPostData() {
  const response = await fetch('http://localhost:4001/posts/')
  const data = await response.json()
  return data
}

function Allthread() {
  const [posts, setPosts] = useState([])
  const [sortOrder, setSortOrder] = useState('descending')
  const [likes, setLikes] = useState()

  useEffect(() => {
    fetchPostData().then((data) => {
      const sortedPosts = data.sort((a, b) => {
        if (sortOrder === 'ascending') {
          return new Date(a.createdDateTime) - new Date(b.createdDateTime)
        } else {
          return new Date(b.createdDateTime) - new Date(a.createdDateTime)
        }
      })
      setPosts(sortedPosts)
    })
  }, [sortOrder])

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'))
  }


  return (
    <div>
      <Filter sortOrder={sortOrder} onToggle={toggleSortOrder} />
      {posts.map((post) => (
        <div key={post._id}>
          {post.isThreadStarter && (
            <>
              <UserDetails post={post} />
              <DatePost post={post} />
              <TextPost post={post} />
              <ImagePost post={post} />
              <LikeButton post={post} setLikes={setLikes} likes={likes} />
              <CommentsCount parentID={post._id} posts={posts}  />
            </>
          )}
        </div>
      ))}
    </div>
  )
          }

export default Allthread