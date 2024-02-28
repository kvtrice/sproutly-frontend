import React from "react"

const PostPassword = ({ password, SetPassword }) => {
		// Update the 'Password' state when the user types in the textarea
		// This value will be passed back to the parent component automatically
    return (
            <input type="password" className="input is-medium" 
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
    )
}

export default PostPassword