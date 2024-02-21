import React, { useState } from "react";
import "./NavBar.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBarSignUp from "./NavBarSignUp";
import PlantSearch from "./PlantSearch";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		// Desktop Nav
		<nav className="navbar">
			<div className="nav-items">
				{/* Logo */}
				<div className="logo">
					<h1>Sproutly</h1>
				</div>
				{/* Search Bar */}
				<div className="search-container">
					<PlantSearch />
				</div>
				{/* Dark Mode Toggle */}
				<div className="dark-mode-toggle">
					<DarkModeToggle />
				</div>
				{/* Sign up Buttons */}
				<div className="signup-buttons-container">
					<NavBarSignUp />
				</div>
				{/* Menu icon */}
				<div onClick={handleNav} className="hamburger-menu-button">
					<AiOutlineMenu size={30} />
				</div>
			</div>
			{/* Mobile Nav */}
			<div className={nav ? "mobile-menu" : "hidden"}>
				{/* Close Icon */}
				<div
					onClick={handleNav}
					className="close-hamburger-menu-button"
				>
					<AiOutlineClose size={30} />
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
