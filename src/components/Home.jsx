import React from 'react'
import AllThreads from "./AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({
	isDark,
	setIsDark,
	selectedPlantTags,
	setSelectedPlantTags,
	selectedPlants,
	setSelectedPlants,
}) => {
	return (
		<>
			<NavBar
				isDark={isDark}
				setIsDark={setIsDark}
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
				selectedPlants={selectedPlants}
				setSelectedPlants={setSelectedPlants}
			/>
			<AllThreads
				selectedPlantTags={selectedPlantTags}
				setSelectedPlantTags={setSelectedPlantTags}
				selectedPlants={selectedPlants}
				setSelectedPlants={setSelectedPlants}
			/>
		</>
	);
};

export default Home