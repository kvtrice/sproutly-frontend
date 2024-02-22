import React from 'react'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import LikeButton from './LikeButton'
import SortFilter from "./SortFilter"

function DisplayComments({ parentID, posts,setPosts}) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID)
    

    // LikeButton post={comment} posts={posts}, the single post need to be post={comment} for each filtered objects but the posts are the array of posts 
    //that was passed by the Parent component so posts has to be posts={posts} and not posts={comment} or 
    //at setPosts change of Liking a post it will change the array of posts to that single object clicked. I learnt the hard way
    return (
        <> 
            <SortFilter posts={posts} setPosts={setPosts}/>
            {commentsWithParentID.map((comment) => (
                <div key={comment._id}>
                    <UserDetails post={comment} />
                    <PostDateTime post={comment} />
                    <PostText post={comment} />
                    <PostImage post={comment} />
                    <LikeButton post={comment} posts={posts} setPosts={setPosts} />
                </div>
            ))}
        </>
    )
}

export default DisplayComments