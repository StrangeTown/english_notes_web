import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Detail from './pages/Detail';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:episode" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
