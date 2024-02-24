import React from 'react'

function UserLikes({ posts, user_id }) {
    const userPostsHistory = posts.filter((item) => item.user._id ===user_id)
    // this is how many likes they received across everything thread starter and comments unless we want to filter by isthread is true and show only the likes they received on their thread starter
    const HowManyLikesTheyReceived = userPostsHistory.reduce((acc, obj) => acc + obj.reactions.length, 0);

    return (
      <p>{HowManyLikesTheyReceived} Likes</p>
    )
  }

export default UserLikes