import React from 'react'
import AllThreads from "../alice-components/AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({ isDark, setIsDark, selectedPlantTags, setSelectedPlantTags }) => {
  return (
		<>
			<NavBar isDark={isDark} setIsDark={setIsDark} setSelectedPlantTags={setSelectedPlantTags} />
			<AllThreads isDark={isDark} selectedPlantTags={selectedPlantTags} />
		</>
  );
}

export default Home