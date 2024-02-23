import React from "react"

const PostPassword = ({ password, SetPassword }) => {

    return (
          <label>
            Enter your password:
            <input
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
          </label>
    )
}

export default PostPassword