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
    const [errorMessage, setErrorMessage] = useState("")

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
                throw new Error(errorData.error)
            }
        } catch (err) {
            setErrorMessage(err.message)
        }
    }

    return (
        <>
             <h1>Welcome to Sproutly</h1>
            <PostUsername SetUsername={SetUsername} username={username} />
            {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
            <PostPassword SetPassword={SetPassword} password={password} />
        <label htmlFor="profilePicture">Upload Profile Picture:</label>
        <ImageUpload  setImageUrl={setImageUrl} id="profilePicture" />
            <PlantSearch setSelectedPlantTags={setSelectedPlantTags} />
            <button onClick={() => addUser(username)}>Register User</button>
        </>
    )
}

export default RegisterUser