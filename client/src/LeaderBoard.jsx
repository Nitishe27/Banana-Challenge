import React, { useEffect, useState } from "react";
import axios from 'axios';
import './LeaderBoard.css';
import BananaInstructionImage from './Components/Banana-instruction.png';

function LeaderBoard() {
  const [username, setUserName] = useState('');
  const [score, setScore] = useState(null); 
  const [rank, setRank] = useState(null); 
  const [leaderboard, setLeaderboard] = useState([]); 
 

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        
        const userResponse = await axios.get('http://localhost:3001/api/username', { withCredentials: true });
        setUserName(userResponse.data.username);

        
        const scoreResponse = await axios.get('http://localhost:3001/api/score', { withCredentials: true });
        setScore(scoreResponse.data.score);

        
        const leaderboardResponse = await axios.get('http://localhost:3001/api/leaderboard', { withCredentials: true });
        setLeaderboard(leaderboardResponse.data); 

        
        const userRank = leaderboardResponse.data.findIndex((entry) => entry.username === userResponse.data.username) + 1;
        setRank(userRank);



      } catch (err) {
        console.error("Error fetching username, score, leaderboard, or quote:", err);
      }
    };

    fetchUserData();
  }, []);



  const handleSendEmail = async () => {
    try {
      
      const response = await axios.post('http://localhost:3001/api/send-email', {}, { withCredentials: true });
      alert(response.data.message);  
    } catch (err) {
      console.error("Error sending email:", err);
      alert("There was an error sending the email.");
    }
  };

  return (
    <div className="home-container">
      <div className="banana-background"></div>

      <div className="content-wrapper">
        <div className="instructions-notice">
          {username && score !== null ? (
            <div>
              <div className="instruction-order">
                <h3>Hey {username} ! You have earned: {score} points</h3>
                <img src={BananaInstructionImage} alt="Instructions" className="instruction-image" />
                {rank && <p>Your rank: {rank}</p>}
                <h3>Leaderboard</h3>
                <ul>
                  {leaderboard.map((entry, index) => (
                    <li key={index}>{entry.username}: {entry.score} points</li>
                  ))}
                </ul>
                <button className="leaderboard-button" onClick={handleSendEmail}>Click here to Confirm</button>
              </div>
            
            </div>
          ) : (
            <h2>Loading leaderboard...</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
