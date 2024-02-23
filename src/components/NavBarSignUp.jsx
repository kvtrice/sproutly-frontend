import React from "react";
import './NavBarSignup.css'
import { Link } from "react-router-dom"

const NavBarSignUp = () => {
	return (
		<div className="signup-buttons">
			<button className="button is-primary signup">
				<Link to={`/register`}>
					<strong>Sign up</strong>
				</Link>
			</button>
			<Link to={`/login`}> <button className="button is-light login">Log in</button></Link>
		</div>
	);
};

export default NavBarSignUp;
