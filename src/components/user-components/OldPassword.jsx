import React from "react"

const OldPassword = ({ oldPassword, SetoldPassword }) => {

    return (
            <input type="password" className="input is-medium" 
              value={oldPassword}
              onChange={(e) => SetoldPassword(e.target.value)}
            />
    )
}

export default OldPassword