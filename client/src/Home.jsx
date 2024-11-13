import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import BananaInstructionImage from './Components/Banana-instruction.png';


function Home() {
  const [username, setUserName] = useState('');

  useEffect(() => {
    
    const fetchUsernmae = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/username', { withCredentials: true });
        setUserName(response.data.username); 
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchUsernmae();
  }, []);

  return (
    <div className="home-container">
      <div className="banana-background"></div>

      <div className="content-wrapper">
        <h1>Welcome to the Banana Challenge</h1>
        {username && <h2>Welcome, {username}!</h2>}

        
        <div className="instructions-notice">
          <h3>How to Play <img src={BananaInstructionImage} alt="Instructions" className="instruction-image" /></h3>
          
          <ul>
            <li>Click on the numbered buttons to guess the solution.</li>
            <li>If you guess correctly, a new image will be generated!</li>
            <li>Keep playing to challenge your skills!</li>
            <li>The game will terminate after the 70-second timer is up.</li>
            <li>You have three hearts; one will vanish for each wrong response. The game ends if all three are gone.</li>
          </ul>

          
          <Link to="/game" className="start-game-button">Start the Game</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
