import React from "react";
import './NavBarSignup.css'
import { Link } from "react-router-dom"

const NavBarSignUp = () => {
	return (
		<div className="signup-buttons">
			<a className="button is-primary signup">
			<Link to={`/register`}><strong>Sign up</strong></Link>
			</a>
			<a className="button is-light login">Log in</a>
		</div>
	);
};

export default NavBarSignUp;
