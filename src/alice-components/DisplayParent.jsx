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
    const Parent = posts.filter((item) => item._id === parentID)
    
    return (
        <>
            {Parent.map((comment) => (
                <div key={comment._id}>
                    <UserDetails post={comment} />
                    <PostDateTime post={comment} />
                    <PostTitle post={comment} />
                    <PostText post={comment} />
                    <PostTag post={comment}/>
                    <PostImage post={comment} />
                    <CommentsCount posts={posts} parentID={comment._id} />
                    <LikeButton post={comment} posts={posts} setPosts={setPosts} />
                </div>
            ))}
        </>
    )
}

export default DisplayParent