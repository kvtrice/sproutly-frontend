import React, { useState } from "react"
import PostUsername from "./PostUsername"
import PostPassword from "./PostPassword"
import PlantSearch from "../PlantSearch"
import ImageUpload from "../ImageUpload"

const RegisterUser = () => {
    const [username, SetUsername] = useState("")
    const [password, SetPassword] = useState("")
    const [selectedPlantTags, setSelectedPlantTags] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

	async function addUser() {
        const userDetail = {
            username : username,
            password : password,
            plants :  selectedPlantTags,
            ProfilePicture : imageUrl
        }
        console.log("Username:", userDetail.username)
        console.log("Password:", userDetail.password)
        console.log("Selected Plant Tags:", userDetail.plants)
        console.log("Profile Picture URL:", userDetail.ProfilePicture)

        try {
            const putRegister = await fetch ("http://localhost:4001/users/register" , {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(userDetail)
            })

            if (!putRegister.ok) {
                const errorData = await putRegister.json()
                errorData.Displayederrors.forEach(error => {
                    if (error.includes('Username')) setUsernameError(error)
                    if (error.includes('Password')) setPasswordError(error)
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
                    <h1 className="has-text-centered">Welcome to Sproutly</h1>
                    <div className="field">
                        <label className="label">Choose a user name (visible to public)</label>
                        <PostUsername SetUsername={SetUsername} username={username} />
                        {usernameError && <p className="has-text-danger">{usernameError}</p>}
                    </div>
                    <div className="field">
                        <label className="label">Choose a password</label>
                        <PostPassword SetPassword={SetPassword} password={password} />
                        {passwordError && <p className="has-text-danger">{passwordError}</p>}
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="profilePicture">Upload Profile Picture:</label>
                        <ImageUpload setImageUrl={setImageUrl} id="profilePicture" />
                    </div>
                    <PlantSearch setSelectedPlantTags={setSelectedPlantTags} />
                    <div className="columns is-centered mt-6">
                    <button className="button is-primary button is-medium" onClick={() => addUser(username)}>Register User</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</>
    )
}

export default RegisterUser