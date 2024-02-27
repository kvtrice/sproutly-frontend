import React from "react";
import './NavBarSignup.css'
import { Link } from "react-router-dom"

const NavBarSignUp = () => {
	return (
		<div className="signup-buttons">
			<Link to={`/register`}>
				<button className="button is-primary signup">
					<strong>Sign up</strong>
				</button>
			</Link>
			<Link to={`/login`}>
				<button className="button is-light login">
					<strong>Log in</strong>
				</button>
			</Link>
		</div>
	);
};

export default NavBarSignUp;
