import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import HomeNavBar from './Components/Home-Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/home' element={
          <>
            <HomeNavBar /> {/* Inline NavBar included here */}
            <Home/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
