import React from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ handleDarkMode, isChecked, isDark, setIsDark }) => {
	return (
		<div className="toggle-container">
			<input
				type="checkbox"
				id="dark-check"
				className="dark-toggle"
				onChange={handleDarkMode}
				checked={isChecked}
			/>
			<label htmlFor="dark-check"></label>
		</div>
	);
};

export default DarkModeToggle
