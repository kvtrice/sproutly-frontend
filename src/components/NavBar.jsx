import React, { useState } from "react";
import "./NavBar.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBarSignUp from "./NavBarSignUp";
import PlantSearch from "./PlantSearch";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = ({
	isDark,
	setIsDark,
	setSelectedPlantTags,
	selectedPlantTags,
	selectedPlants,
	setSelectedPlants,
}) => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		// Desktop Nav
		<nav className="sproutly-navbar">
			<div className="nav-items">
				{/* Logo */}
				<div className="logo">
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
				{/* Search Bar */}
				<div className="search-container">
					<PlantSearch
						selectedPlantTags={selectedPlantTags}
						setSelectedPlantTags={setSelectedPlantTags}
						selectedPlants={selectedPlants}
						setSelectedPlants={setSelectedPlants}
					/>
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
					<AiOutlineMenu size={30} className="mob-menu-button" />
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
						<AiOutlineClose size={30} className="mob-menu-button" />
					</div>
					{/* Sign up Buttons mobile */}
					<div className="signup-buttons-container-mob">
						<NavBarSignUp />
					</div>
					<hr className="line" />
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
