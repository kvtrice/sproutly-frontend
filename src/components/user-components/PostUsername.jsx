import React from "react"

const PostUsername = ({ username, SetUsername }) => {
		// Update the 'Username' state when the user types in the textarea
		// This value will be passed back to the parent component automatically
    return (
            <input className="input is-medium"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
            />
    )
}

export default PostUsername