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
			<button className="button is-light login"><Link to={`/login`}><strong>Log in</strong></Link></button>
		</div>
	);
};

export default NavBarSignUp;
