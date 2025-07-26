import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import PeppaPig from './pages/Detail/PeppaPig';
import Home from './pages/Home';
import FindingNemo from './pages/Detail/FindingNemo';

function App() {

  return (
    <BrowserRouter basename="/english_notes_web">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peppa-pig/:episode" element={<PeppaPig />} />
        <Route path="/finding-nemo/:section" element={<FindingNemo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
