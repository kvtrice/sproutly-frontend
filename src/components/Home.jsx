import React from 'react'
import AllThreads from "./AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({
	isDark,
	setIsDark,
	selectedPlantTags,
	setSelectedPlantTags
}) => {
	return (
		<>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
			/>
			<AllThreads
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
			/>
		</>
	);
};

export default Home