import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarProfilePicture = ({ viewProfileLink, editProfileLink, loggedInUserPictureUrl }) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const nav = useNavigate()

	const handleUserMenu = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
	};

	const handleNavigateUserEditProfile = () => {
		nav(`${editProfileLink}`)
	}

	const handleNavigateUserViewProfile = () => {
		nav(`${viewProfileLink}`)
	}


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
			<div className={isUserMenuOpen ? "edit-menu-wrapper" : "hidden"}>
				<div className="edit-menu-container">
						<p onClick={handleNavigateUserViewProfile} className="menu-button">View Profile</p>
						<p onClick={handleNavigateUserEditProfile} className="menu-button">Edit Profile</p>
				</div>
			</div>
		</div>
	);
};

export default NavBarProfilePicture;
