import React from "react";
import './NavBarSignup.css'

const NavBarSignUp = () => {
	return (
		<div className="signup-buttons">
			<a className="button is-primary signup">
				<strong>Sign up</strong>
			</a>
			<a className="button is-light login">Log in</a>
		</div>
	);
};

export default NavBarSignUp;
