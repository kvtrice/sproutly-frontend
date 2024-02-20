import React from 'react'

function CommentsCount({ parentID, posts }) {
    const commentsWithParentID = posts.filter((item) => item.parentID === parentID);
    const numComments = commentsWithParentID.length;
  
    return (
      <a href="the thread posts link">{numComments} comments</a>
    );
  }

export default CommentsCount