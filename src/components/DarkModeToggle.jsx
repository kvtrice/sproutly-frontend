import React from "react";
import "./DarkModeToggle.css";

const DarkModeToggle = ({ handleDarkMode, isChecked, isDark, setIsDark }) => {
	return (
		<div className="toggle-container">
			<input
				type="checkbox"
				id="dark-check"
				className="dark-toggle"
				// Toggle dark mode when the switch is changed
				onChange={handleDarkMode}
				// Using a checkbox under the hood for the toggle on/off so it needs to no if it's checked or not
				checked={isChecked}
			/>
			<label htmlFor="dark-check"></label>
		</div>
	);
};

export default DarkModeToggle
