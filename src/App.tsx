import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import PeppaPig from './pages/Detail/PeppaPig';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peppa-pig/:episode" element={<PeppaPig />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
