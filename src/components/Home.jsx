import React from 'react'
import AllThreads from "./AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({
	isDark,
	setIsDark,
	selectedPlantTags,
	setSelectedPlantTags,
	isUserLoggedIn,
	loggedInUserPictureUrl,
	loggedInUserId
}) => {
	return (
		<>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
			<AllThreads
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
				loggedInUserPictureUrl={loggedInUserPictureUrl}
				isUserLoggedIn={isUserLoggedIn}
				loggedInUserId={loggedInUserId}
			/>
		</>
	);
};

export default Home