import React from "react"

const PostPassword = ({ password, SetPassword }) => {

    return (
            <input type="password" className="input is-medium" 
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
    )
}

export default PostPassword