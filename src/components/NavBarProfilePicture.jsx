import React, { useState } from "react";

const NavBarProfilePicture = ({ viewProfileLink, editProfileLink, loggedInUserPictureUrl }) => {
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const handleUserMenu = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
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
			<div className={isUserMenuOpen ? "edit-menu-wrapper" : "hidden"}>
				<div className="edit-menu-container">
					<a href={viewProfileLink}>
						<p className="menu-button">View Profile</p>
					</a>
					<a href={editProfileLink}>
						<p className="menu-button">Edit Profile</p>
					</a>
				</div>
			</div>
		</div>
	);
};

export default NavBarProfilePicture;
