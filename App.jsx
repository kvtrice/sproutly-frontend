import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./src/components/post-components/CreatePost";
import Home from "./src/components/Home";
import Allthread from "./src/alice-components/Allthread.jsx";

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={
						<>
							<Home/>
							<Allthread/>
						</>
						} />
					<Route/>
					  <Route
							path="new"
							element={<CreatePost />}
						/>
					<Route/> 
				</Routes>
			</BrowserRouter>
			
		</>
	)
}

export default App
