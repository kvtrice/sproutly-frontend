import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarProfilePicture = ({ viewProfileLink, editProfileLink, loggedInUserPictureUrl }) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const nav = useNavigate();

	// Handler for opening and closing the menu that display the links to the user profile
	const handleUserMenu = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
	};

	// Function to handle navigating to edit profile
	// Using useNavigate() due to routing issues post deployment
	const handleNavigateUserEditProfile = () => {
		nav(`${editProfileLink}`);
	};

	// Function to navigate to view profile
	// Using useNavigate() due to routing issues post deployment
	const handleNavigateUserViewProfile = () => {
		nav(`${viewProfileLink}`);
	};

	return (
		<div>
			<div className="nav-profile-picture-container">
				<img
					className="nav-profile-picture"
					src={loggedInUserPictureUrl}
					alt="Profile Picture"
					onClick={handleUserMenu}
				/>
			</div>
			{/* Menu that displays conditionally if a user clicks on theit profile picture - based on the isUserMenuOpen state */}
			<div className={isUserMenuOpen ? "edit-menu-wrapper" : "hidden"}>
				<div className="edit-menu-container">
					<p
						onClick={handleNavigateUserViewProfile}
						className="menu-button"
					>
						View Profile
					</p>
					<p
						onClick={handleNavigateUserEditProfile}
						className="menu-button"
					>
						Edit Profile
					</p>
				</div>
			</div>
		</div>
	);
};

export default NavBarProfilePicture;
