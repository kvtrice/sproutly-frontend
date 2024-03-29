import React, { useState } from "react"
import PostUsername from "./user-components/PostUsername"
import PostPassword from "./user-components/PostPassword"
import "./RegisterUser.css";
import NavBar from "./NavBar";
import { useNavigate} from "react-router-dom"

// grabbing the props passed from the app.jsx
const Login = ({
	isDark,
	setIsDark,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) => {
	const nav = useNavigate()
	const [username, SetUsername] = useState("");
	const [password, SetPassword] = useState("");
	const [loginError, setLoginError] = useState("");

	async function login() {
	// clearing the error message each time login is trigerred so that old error message are not displayed as they are fixed.
		setLoginError('')


		const userDetail = {
			username: username,
			password: password,
		}
		// there is no need to do a useEffect when we are posting since there is no rendering side effect from a post component
		try {
			const putLogin = await fetch("https://sproutly-api.onrender.com/users/login", {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify(userDetail),
			});

			if (!putLogin.ok) {
				const errorData = await putLogin.json();
				setLoginError(errorData.error);
			} else {
				const payload = await putLogin.json();
				// at the sucess of the login store our token in sessionStorage under key called user_id this is crucial for the functionality of our app
				sessionStorage.setItem("user_id", payload.token);
				nav(`/`)
				//trigger a reload of the home page after navigating, without it the components that are meant to show if you log in after navigation from login won't show.
				window.location.reload()
			}
		} catch (err) {
			console.log(err.message);
		}
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
				<div className="component-wrapper login">
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
							Welcome back to Sproutly!
						</h2>
					</div>
					<div className="field">
						<label className="text">Username</label>
						<PostUsername
							SetUsername={SetUsername}
							username={username}
						/>
					</div>
					<div className="field">
						<label className="text">Password</label>
						<PostPassword
							SetPassword={SetPassword}
							password={password}
						/>
						{loginError && (
							<p className="has-text-danger">{loginError}</p>
						)}
					</div>
					<div className="signup-button">
						<button
							className="button is-primary"
							onClick={() => login(username)}
							
						>
							Login
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login