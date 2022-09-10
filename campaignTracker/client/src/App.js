import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer';
import Login from './Pages/login';
import Register from './Pages/register';
import LandingPage from './Pages/LandingPage';
import CampaignMap from './Pages/CampaignMap';
import CreateCharacter from './Pages/createCharacter';
import Home from './Pages/home';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/CharacterCreator" element={<CreateCharacter />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing" element={<LandingPage />}></Route>

      </Routes>
      <Footer />
      
      
    </Router>
  );
}

export default App;
