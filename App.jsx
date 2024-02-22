import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import ThreadPage from './src/alice-components/ThreadPage'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/post/:parentID" element={<ThreadPage/>} />
					<Route path="new" element={<CreatePost/>} />
				</Routes>
			</BrowserRouter>
		</>
	)
	}

export default App
