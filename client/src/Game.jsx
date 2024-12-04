import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Game.css";
import Heart from "./Components/Heart.png"; 

function Game() {
  const [bananaData, setBananaData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(70); 
  const [isTimerRunning, setIsTimerRunning] = useState(false); 
  const [score, setScore] = useState(0); 
  const [hearts, setHearts] = useState(3); 
  const [isGameOver, setIsGameOver] = useState(false); 

  const navigate = useNavigate(); 

  const fetchBananaData = () => {
    axios
      .get("http://localhost:3001/api/banana")
      .then((response) => {
        console.log("Data received on client:", response.data);
        setBananaData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data on client:", error);
      });
  };

  useEffect(() => {
    fetchBananaData();
  }, []);

  
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0 && hearts > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);//I referred codepen.io as referrences for building the react timer.
      }, 1000);

      return () => clearInterval(timer); 
    } else if (timeLeft === 0 || hearts === 0) {
     
      setIsGameOver(true);
    }
  }, [isTimerRunning, timeLeft, hearts]);

  const handleButtonClick = (number) => {
    if (!isGameOver) { 
      if (bananaData && number === bananaData.solution) {
        console.log("Correct answer!");
        setScore((prevScore) => prevScore + 1); 
        fetchBananaData(); 
      } else {
        console.log("Try again!");
        if (hearts > 0) {
          setHearts((prevHearts) => prevHearts - 1); 
        }
      }
    }
  };

  const handleStartClick = () => {
    setIsTimerRunning(true); 
    setTimeLeft(70); 
    setHearts(3); 
    setScore(0); 
    setIsGameOver(false); 
  };

  const handleEndGame = () => {
    
    axios
      .post("http://localhost:3001/api/score", { score }, { withCredentials: true })//I referred Axios Documentation for building API between client and server
      .then((response) => {
        console.log("Score saved:", response.data); 
        navigate("/leaderboard"); 
      })
      .catch((error) => {
        console.error("Error saving score:", error); 
      });
  };

  const handleRestartClick = () => {
    setIsGameOver(false); 
    setTimeLeft(70); 
    setHearts(3); 
    setScore(0); 
    setIsTimerRunning(true); 
  };

  return (
    <div className="home-container">
      <div className="banana-background"></div>
      <div className="content-wrapper">
        {bananaData ? (
          <div>
            <div className="left-section">
            <div className="status-container">
              <div className="hearts-container">
                <p className="status-item">Lives:</p>
                {Array.from({ length: hearts }, (_, index) => (
                  <img
                    key={index}
                    src={Heart}
                    alt="Heart"
                    className="heart-icon"
                  />
                ))}
              </div>
              <p className="status-item">Time: {timeLeft}s</p>
              <p className="status-item">Score: {score}</p>
            </div>
            <img
              src={bananaData.question}
              alt="Banana"
              style={{ maxWidth: "100%", height: "auto" }}
              onError={(e) => {
                console.error("Failed to load image:", e.target.src);
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            </div>
            <div className="right-section">
            <div className="mt-4">
            <div className="button-container">
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleButtonClick(i)}
                  className="btn btn-primary mx-1"
                  disabled={!isTimerRunning || isGameOver} 
                >
                  {i}
                </button>
              ))}
            </div>
            </div>
            <br></br>
            {!isTimerRunning && !isGameOver && (
              <button onClick={handleStartClick} className="btn btn-success mt-4">
                Start Now
              </button>
            )}
            </div>
            {isGameOver && (
              <div className="game-over-modal">
                <p className="game-over-message">Game Over !</p>
                <div className="button-container">
                  <button onClick={handleRestartClick} className="restart-button">
                    Restart Game
                  </button>
                  <button onClick={handleEndGame} className="end-game-button">
                    End Game
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Game;



