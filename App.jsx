import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import ThreadPage from './src/alice-components/ThreadPage'
import useLocalStorage from "use-local-storage"

function App() {
	// Dark mode state - required by all components so lifted it to the highest level and passed it down via prop drilling
	const [ isDark, setIsDark ] = useLocalStorage("isDark", false)

	return (
<>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home isDark={isDark} setIsDark={setIsDark}/>} />
                    <Route path="/post" >
                        <Route path="new" element={<CreatePost isDark={isDark} setIsDark={setIsDark}/>} />
                        <Route path=":parentID" element={<ThreadPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
	)
	}

export default App
