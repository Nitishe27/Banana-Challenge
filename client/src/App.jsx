import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Game from './Game';
import LeaderBoard from './LeaderBoard';
import HomeNavBar from './Components/Home-Navbar';
import GameNavBar from './Components/Game-Navbar';
import LeaderBoardNavBar from './Components/LeaderBoard-NavBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={
          <>
            <HomeNavBar /> 
            <Home/>
          </>
        } />

      <Route path='/game' element={
          <>
            <GameNavBar /> 
            <Game/>
          </>
        } />

<Route path='/leaderboard' element={
          <>
            <LeaderBoardNavBar /> 
            <LeaderBoard/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
