import React from "react"

const PostUsername = ({ username, SetUsername }) => {

    return (
            <input className="input is-medium"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
    )
}

export default PostUsername