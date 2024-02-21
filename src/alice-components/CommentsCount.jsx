import React, { useState } from 'react';
import UserDetails from './UserDetails';
import PostDateTime from './PostDateTime';
import PostText from './PostText';
import PostImage from './PostImage';

function CommentsCount({ parentID, posts }) {
  const commentsWithParentID = posts.filter((item) => item.parentID === parentID);
  const numComments = commentsWithParentID.length;

  const [showComments, setShowComments] = useState(false);


  const handleCommentsClick = () => {
    setShowComments(!showComments)
  }

  return (
    <div>
      <span onClick={handleCommentsClick} style={{ cursor: 'pointer' }}>
        {numComments} comments
      </span>
      {showComments && (
        <div>
          {/* Render only the comments related to this post */}
          {commentsWithParentID.map((comment) => (
            <div key={comment._id}>
              <UserDetails post={comment} />
              <PostDateTime post={comment} />
              <PostText post={comment} />
              <PostImage post={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentsCount