import React from 'react'
import UserDetails from './UserDetails'
import PostDateTime from './PostDateTime'
import PostText from './PostText'
import PostImage from './PostImage'
import CommentsCount from './CommentsCount'
import LikeButton from './LikeButton'
import PostTitle from './PostTitle'
import PostTag from './PostTag'
import "./DisplayPost.css";

function DisplayParent({ parentID, posts,setPosts }) {
    const parents = posts.filter((item) => item._id === parentID)
    
    return (
		<div>
			{parents.map((parent) => (
				<div key={parent._id} className='post'>
					<div className="post-header">
						<UserDetails post={parent} />
						<PostDateTime post={parent} />
					</div>
					<div className="post-text-tags">
                        <PostTitle post={parent} />
                        <PostText post={parent} />
                        <PostTag post={parent} />
                    </div>
					<div className='post-image'>
                        <PostImage post={parent} />
                    </div>
					<div className="post-interaction">
						<LikeButton
							post={parent}
							posts={posts}
							setPosts={setPosts}
						/>
						<CommentsCount posts={posts} parentID={parent._id} />
					</div>
				</div>
			))}
		</div>
	);
}

export default DisplayParent