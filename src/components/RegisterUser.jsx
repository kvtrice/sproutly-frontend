import React, { useState } from "react"
import PostUsername from "./user-components/PostUsername.jsx"
import PostPassword from "./user-components/PostPassword.jsx"
import PlantSearch from "./PlantSearch"
import ImageUpload from "./ImageUpload"
import "./RegisterUser.css";
import NavBar from "./NavBar.jsx";
import { useNavigate} from "react-router-dom"


const RegisterUser = ({
	isDark,
	setIsDark,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) => {
	const nav = useNavigate()
	const [username, setUsername] = React.useState("")
	const [password, SetPassword] = useState("")
	const [selectedPlantTags, setSelectedPlantTags] = useState([])
	const [imageUrl, setImageUrl] = useState("")
	const [usernameError, setUsernameError] = useState("")
	const [passwordError, setPasswordError] = useState("")

	async function addUser() {
    // clearing the error message each time addUser is trigerred so that old error message are not displayed as they are fixed.
	setUsernameError('')
	setPasswordError('')

		const userDetail = {
			username: username,
			password: password,
			plants: selectedPlantTags,
			ProfilePicture: imageUrl,
		}

		try {
			const putRegister = await fetch(
				"http://localhost:4001/users/register",
				{
					method: "POST",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(userDetail),
				}
			);

			if (!putRegister.ok) {
				const errorData = await putRegister.json();
				errorData.Displayederrors.forEach((error) => {
					if (error.includes("Username")) setUsernameError(error)
					if (error.includes("Password")) setPasswordError(error)
					if (error.includes("required")) setUsernameError(error)
				})
			}
		} catch (err) {
			console.error(err.message)
		}
		nav(`/login`)
	}

	return (
		<>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
			<section className="section page-wrapper">
				<div className="component-wrapper register">
					<div className="page-header">
						{/* Logo */}
						<div className="welcome-logo">
							{isDark ? (
								<a href="/">
									<img
										src="https://res.cloudinary.com/djtgmjm16/image/upload/v1708755763/logos/logo-dark_i7f6px.png"
										alt="Sproutly Logo"
									/>
								</a>
							) : (
								<a href="/">
									<img
										src="https://res.cloudinary.com/djtgmjm16/image/upload/v1708755763/logos/logo-light_lo6fnn.png"
										alt="Sproutly Logo"
									/>
								</a>
							)}
						</div>
						<h2 className="has-text-centered welcome-text">
							Welcome to Sproutly!
						</h2>
					</div>
					<div className="field">
						<label className="text">
							Choose a user name (visible to public):
						</label>
						<PostUsername
							username={username}
							SetUsername={setUsername}
						/>
						{usernameError && (
							<p className="has-text-danger">{usernameError}</p>
						)}
					</div>
					<div className="field">
						<label className="text">Choose a password:</label>
						<PostPassword
							SetPassword={SetPassword}
							password={password}
						/>
						{passwordError && (
							<p className="has-text-danger">{passwordError}</p>
						)}
					</div>
					<div className="profile-picture-upload upload-image">
						<label className="text" htmlFor="profilePicture">
							Choose a profile picture:
						</label>
						<div>
							<ImageUpload
								setImageUrl={setImageUrl}
								id="profilePicture"
							/>
						</div>
					</div>
					<div>
						<label className="text">What plants do you own?</label>
						<PlantSearch
							setSelectedPlantTags={setSelectedPlantTags}
						/>
					</div>
					<div className="signup-button">
						<button
							className="is-primary button"
							onClick={() => addUser(username)}
						>
							Sign up
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default RegisterUser