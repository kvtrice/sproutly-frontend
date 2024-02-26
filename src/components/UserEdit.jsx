import React, { useState,useEffect } from "react"
import PostUsername from "./user-components/PostUsername.jsx"
import PostPassword from "./user-components/PostPassword.jsx"
import PlantSearch from "./PlantSearch"
import ImageUpload from "./ImageUpload"
import OldPassword from "./user-components/OldPassword.jsx"
import NavBar from "./NavBar.jsx";
import './RegisterUser.css'
import { useNavigate} from "react-router-dom"


const EditUserDetails = ({
	isDark,
	setIsDark,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) => {
	const nav = useNavigate()
	const [username, SetUsername] = useState("")
	const [password, SetPassword] = useState("")
	const [oldPassword, SetoldPassword] = useState("")
	const [selectedPlantTags, setSelectedPlantTags] = useState([])
	const [imageUrl, setImageUrl] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [oldPasswordError, setoldPasswordError] = useState("")
	const [usernameError, setUsernameError] = useState("")

	

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(
				`http://localhost:4001/users/${loggedInUserId}`
			)
			const data = await response.json()
			SetUsername(data.username);
			setSelectedPlantTags(data.plants || []);
		}
		fetchPost()
	}, [loggedInUserId])

	async function editUser() {
		// clearing the error message each time addUser is trigerred so that old error message are not displayed as they are fixed.
		setUsernameError("");
		setPasswordError("");
		setoldPasswordError("");

		const userDetail = {
			username: username,
			newPassword: password,
			oldPassword: oldPassword,
			plants: selectedPlantTags,
			profilePicture: imageUrl,
		};

		try {
			const putRegister = await fetch(
				`http://localhost:4001/users/${loggedInUserId}`,
				{
					method: "PUT",
					headers: {
						"content-Type": "application/json",
					},
					body: JSON.stringify(userDetail),
				}
			);

			if (!putRegister.ok) {
				const errorData = await putRegister.json();
				console.log("errorData:", errorData);
				errorData.Displayederrors.forEach((error) => {
					if (error.includes("Incorrect")) setoldPasswordError(error)
					if (error.includes("minimum")) setPasswordError(error)
					if (error.includes("Username")) setUsernameError(error)
					if (error.includes("required")) setUsernameError(error)
				})
			}
		} catch (err) {
			console.error(err.message)
		}
		nav(`/user/${loggedInUserId}`)
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
				<div className="component-wrapper user-edit">
					<div className="page-header">
						<h2 className="welcome-text">Edit Profile</h2>
					</div>
					<div className="field">
						<label className="text">
							Update user name (visible to public)
						</label>
						<PostUsername
							SetUsername={SetUsername}
							username={username || ""}
						/>
						{usernameError && (
							<p className="has-text-danger">{usernameError}</p>
						)}
					</div>

					<div className="old-new-password">
						<div className="field old-password">
							<label className="text old-password">
								Confirm old password
							</label>
							<OldPassword
								SetoldPassword={SetoldPassword}
								oldPassword={oldPassword}
							/>
							{oldPasswordError && (
								<p className="has-text-danger">
									{oldPasswordError}
								</p>
							)}
						</div>

						<div className="field new-password">
							<label className="text">New password</label>
							<PostPassword
								SetPassword={SetPassword}
								password={password}
							/>
							{passwordError && (
								<p className="has-text-danger">
									{passwordError}
								</p>
							)}
						</div>
					</div>
					<div className="field profile-picture-upload">
						<label className="text" htmlFor="profilePicture">
							Change profile picture:
						</label>
						<ImageUpload
							setImageUrl={setImageUrl}
							id="profilePicture"
						/>
					</div>
					<label className="text">Update the plants you own:</label>
					<PlantSearch
						setSelectedPlantTags={setSelectedPlantTags}
						selectedPlantTags={selectedPlantTags}
					/>
					<div className="save-button">
						<button
							className="is-primary button"
							onClick={() => editUser(username)}
						>
							Save
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default EditUserDetails