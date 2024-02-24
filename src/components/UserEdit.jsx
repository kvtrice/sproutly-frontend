import React, { useState } from "react"
import PostUsername from "./user-components/PostUsername.jsx"
import PostPassword from "./user-components/PostPassword.jsx"
import PlantSearch from "./PlantSearch"
import ImageUpload from "./ImageUpload"
import OldPassword from "./user-components/OldPassword.jsx"

const EditUserDetails = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [oldPassword, SetoldPassword] = useState("")
    const [selectedPlantTags, setSelectedPlantTags] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [oldPasswordError, setoldPasswordError] = useState("")
    const [usernameError, setUsernameError] = useState("")

	async function addUser() {
        const userDetail = {
            username : username,
            newPassword : password,
            oldPassword : oldPassword,
            plants :  selectedPlantTags,
            ProfilePicture : imageUrl
        }

        //hardcoding for testing purpose 
        const user_id = "65d469278aaa81f8f6af8497"
        try {
            const putRegister = await fetch (`http://localhost:4001/users/${user_id}` , {
                method: "PUT",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userDetail)
            })

            if (!putRegister.ok) {
                const errorData = await putRegister.json()
                console.log('errorData:', errorData)
                errorData.Displayederrors.forEach(error => {
                    if (error.includes('Incorrect')) setoldPasswordError(error)
                    if (error.includes('minimum')) setPasswordError(error)
                    if (error.includes('Username')) setUsernameError(error)
                })
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
<>
    <section className="section">
        <div className="container">
            <div className="columns is-centered">       
                <div className="column is-half">
                    <h1 className="has-text-centered">Edit Profile</h1>
                    <div className="field">
                        <label className="label">Update user name (visible to public)</label>
                        <PostUsername SetUsername={SetUsername} username={username} />
                        {usernameError && <p className="has-text-danger">{usernameError}</p>}
                    </div>

                    <div className="field">
                        <label className="label">Old password</label>
                        <OldPassword SetoldPassword={SetoldPassword} oldPassword={oldPassword} />
                        {oldPasswordError && <p className="has-text-danger">{oldPasswordError}</p>}
                    </div>
                    <div className="field">
                        <label className="label">New password</label>
                        <PostPassword SetPassword={SetPassword} password={password} />
                        {passwordError && <p className="has-text-danger">{passwordError}</p>}
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="profilePicture">Change Profile Picture:</label>
                        <ImageUpload setImageUrl={setImageUrl} id="profilePicture" />
                    </div>
                    <label className="label mt-5">What plant do you own</label>
                    <PlantSearch setSelectedPlantTags={setSelectedPlantTags} />
                    <div className="columns is-centered mt-6">
                    <button className="button is-primary button is-medium" onClick={() => addUser(username)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
    )
}

export default EditUserDetails