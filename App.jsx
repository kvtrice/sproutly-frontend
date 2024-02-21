import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/post">
						<Route path="new" element={<CreatePost />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App
