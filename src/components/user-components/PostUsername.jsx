import React from "react"

const PostUsername = ({ username, SetUsername }) => {

    return (
          <label>
            Enter your username:
            <input
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
          </label>
    )
}

export default PostUsername