import React from 'react'
import AllThreads from "../alice-components/AllThreads.jsx";
import NavBar from "./NavBar";

const Home = ({ isDark, setIsDark }) => {
  return (
		<>
			<NavBar isDark={isDark} setIsDark={setIsDark} />
			<AllThreads isDark={isDark} />
		</>
  );
}

export default Home