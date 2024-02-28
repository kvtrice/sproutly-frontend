import React from "react";
import './NavBarSignup.css'
import { Link } from "react-router-dom"

const NavBarSignUp = () => {
	return (
		<div className="signup-buttons">
			{/* Button to navigate to Register page from navbar*/}
			<Link to={`/register`}>
				<button className="button is-primary signup">
					<strong>Sign up</strong>
				</button>
			</Link>
			{/* Button to navigate to Login page from navbar */}
			<Link to={`/login`}>
				<button className="button is-light login">
					<strong>Log in</strong>
				</button>
			</Link>
		</div>
	);
};

export default NavBarSignUp;
