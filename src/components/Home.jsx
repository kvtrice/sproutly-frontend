import React from 'react'
import AllThreads from "./AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({ isDark, setIsDark, selectedPlantTags, setSelectedPlantTags }) => {
  return (
		<>
			<NavBar isDark={isDark} setIsDark={setIsDark} setSelectedPlantTags={setSelectedPlantTags} />
			<AllThreads selectedPlantTags={selectedPlantTags} />
		</>
  );
}

export default Home