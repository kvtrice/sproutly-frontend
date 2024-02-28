import React from "react"

// this component was created for the sake of our API check to ensure that if user change password in the edit user profile page that they confirm their previous password
const OldPassword = ({ oldPassword, SetoldPassword }) => {
		// Update the 'oldPasswor' state when the user types in the textarea
		// This value will be passed back to the parent component automatically
    return (
            <input type="password" className="input is-medium" 
              value={oldPassword}
              onChange={(e) => SetoldPassword(e.target.value)}
            />
    )
}

export default OldPassword