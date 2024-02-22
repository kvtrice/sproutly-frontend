import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import ThreadPage from './src/alice-components/ThreadPage'
import useLocalStorage from "use-local-storage"
import { useState } from 'react'

function App() {
	// State to ahndle dark mode
    // Required by all components so lifted it to the highest level and passed it down via prop drilling
	const [ isDark, setIsDark ] = useLocalStorage("isDark", false)

    // State to handle selected plant tags 
    // Required by Navbar, AllThreads, CreatePost & CreateUser Components
    const [selectedPlantTags, setSelectedPlantTags] = useState([])

	return (
<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home isDark={isDark} setIsDark={setIsDark} selectedPlantTags={selectedPlantTags} setSelectedPlantTags={setSelectedPlantTags}/>} />
                    <Route path="/post" >
                        <Route path="new" element={<CreatePost isDark={isDark} selectedPlantTags={selectedPlantTags} setSelectedPlantTags={setSelectedPlantTags}/>} />
                        <Route path=":parentID" element={<ThreadPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
	)
	}

export default App
