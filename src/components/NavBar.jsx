import React, { useState } from "react";
import "./NavBar.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBarSignUp from "./NavBarSignUp";
import PlantSearch from "./PlantSearch";
import DarkModeToggle from "./DarkModeToggle";
import NavBarCreatePost from "./NavBarCreatePost";
import NavBarProfilePicture from "./NavBarProfilePicture";
import { useNavigate } from "react-router-dom";

const NavBar = ({
	isDark,
	setIsDark,
	setSelectedPlantTags,
	selectedPlantTags,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId,
}) => {
	const [nav, setNav] = useState(false);
	const navigate = useNavigate();

	const handleNav = () => {
		setNav(!nav);
	};

	const editProfileLink = `/user/${loggedInUserId}/edit`;
	const viewProfileLink = `/user/${loggedInUserId}`;

	const handleNavigateUserEditProfile = () => {
		navigate(`/user/${loggedInUserId}/edit`);
	};

	const handleNavigateUserViewProfile = () => {
		navigate(`/user/${loggedInUserId}`);
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
					/>
				</div>
				{/* Dark Mode Toggle */}
				<div className="dark-mode-toggle-container">
					<DarkModeToggle
						isChecked={isDark}
						handleDarkMode={() => setIsDark(!isDark)}
					/>
				</div>

				{/* Switch which components are shown based on if the user is logged in or not */}

				<div className="logged-in-switch">
					{isUserLoggedIn ? (
						<div className="logged-in-container">
							{/* Create Post Button */}
							<div className="create-post-button-container">
								<NavBarCreatePost />
							</div>
							{/* LoggedIn User's Profile Picture */}
							<div className="profile-picture-container">
								<NavBarProfilePicture
									editProfileLink={editProfileLink}
									viewProfileLink={viewProfileLink}
									loggedInUserPictureUrl={
										loggedInUserPictureUrl
									}
								/>
							</div>
						</div>
					) : (
						<div className="logged-out-container">
							{/* Sign up Buttons */}
							<div className="signup-buttons-container">
								<NavBarSignUp />
							</div>
						</div>
					)}
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
					{/* Logo */}
					<div className="mob-logo">
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

					<div>
						{isUserLoggedIn ? (
							<div>
								<div className="create-post-button-mob">
									<a href="/post/new">
										<button className="button is-primary">
											Create Post
										</button>
									</a>
								</div>
								<div className="user-menu-container">
									<p
										onClick={handleNavigateUserViewProfile}
										className="menu-link"
									>
										View Profile
									</p>
									<p
										onClick={handleNavigateUserEditProfile}
										className="menu-link"
									>
										Edit Profile
									</p>
								</div>
							</div>
						) : (
							<div className="signup-buttons-container-mob">
								<NavBarSignUp />
							</div>
						)}
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
