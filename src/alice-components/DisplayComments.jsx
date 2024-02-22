import React from 'react'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'

function DisplayComments({ parentID, posts }) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID);
  
    return (
        <>
            {commentsWithParentID.map((comment) => (
                <div key={comment._id}>
                    <UserDetails post={comment} />
                    <PostDateTime post={comment} />
                    <PostText post={comment} />
                    <PostImage post={comment} />
                </div>
            ))}
        </>
    )
}

export default DisplayComments