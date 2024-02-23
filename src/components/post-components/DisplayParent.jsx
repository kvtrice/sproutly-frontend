import React from 'react'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import CommentsCount from './CommentsCount'
import LikeButton from './LikeButton'
import PostTitle from './PostTitle'
import PostTag from './PostTag'

function DisplayParent({ parentID, posts,setPosts }) {
    const parents = posts.filter((item) => item._id === parentID)
    
    return (
        <>
            {parents.map((parent) => (
                <div key={parent._id}>
                    <UserDetails post={parent} />
                    <PostDateTime post={parent} />
                    <PostTitle post={parent} />
                    <PostText post={parent} />
                    <PostTag post={parent}/>
                    <PostImage post={parent} />
                    <CommentsCount posts={posts} parentID={parent._id} />
                    <LikeButton post={parent} posts={posts} setPosts={setPosts} />
                </div>
            ))}
        </>
    )
}

export default DisplayParent