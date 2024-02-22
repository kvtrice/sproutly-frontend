import React, { useState } from "react";
import "./NavBar.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBarSignUp from "./NavBarSignUp";
import PlantSearch from "./PlantSearch";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = ( {isDark, setIsDark} ) => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		// Desktop Nav
		<nav className="sproutly-navbar" data-theme={isDark ? "dark" : "light"}>
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
				<div className="dark-mode-toggle-container">
					<DarkModeToggle
						isChecked={isDark}
						handleDarkMode={() => setIsDark(!isDark)}
					/>
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
			<div className={nav ? "mobile-nav" : "hidden"}>
				<div className="mobile-menu">
					{/* Close Icon */}
					<div
						onClick={handleNav}
						className="close-hamburger-menu-button"
					>
						<AiOutlineClose size={30} />
					</div>
					{/* Sign up Buttons mobile */}
					<div className="signup-buttons-container-mob">
						<NavBarSignUp />
					</div>
					<hr className="line"/>
					{/* Dark Mode Toggle */}
					<div className="dark-mode-toggle-container-mob">
						<DarkModeToggle
							isChecked={isDark}
							handleDarkMode={() => setIsDark(!isDark)}
						/>
						<p>Dark Mode</p>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
