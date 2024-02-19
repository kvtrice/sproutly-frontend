import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import CreatePost from './src/components/post-components/CreatePost'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
