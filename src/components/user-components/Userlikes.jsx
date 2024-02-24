import React from 'react'

function UserLikes({ posts, user_id }) {
    console.log(user_id)
    const userPostsHistory = posts.filter((item) => item.user._id ===user_id)
    console.log(userPostsHistory)
    // this is how many likes they received across everything thread starter and comments unless we want to filter by isthread is true and show only the likes they received on their thread starter
    const HowManyLikesTheyReceived = userPostsHistory.reduce((acc, obj) => acc + obj.reactions.length, 0);
    console.log(HowManyLikesTheyReceived);

    return (
      <p>Sarah Received {HowManyLikesTheyReceived} Likes</p>
    )
  }

export default UserLikes