import React, { useState, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import "./Game.css"; // Import your CSS file

const GuessMyNumber = () => {
  const [secretNumber, setSecretNumber] = useState(
    Math.trunc(Math.random() * 20) + 1
  );
  const [score, setScore] = useState(10);
  const [highscore, setHighscore] = useState(0);
  const [message, setMessage] = useState("Start playing...");
  const [userHighscore, setUserHighscore] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Replace with the actual user ID and token
  const userId = "66e30d50679335e6891b50f0";
  const token = localStorage.getItem("token"); // Get token from localStorage or context
  console.log(token);

  useEffect(() => {
    // Fetch the highscore from the backend on component mount
    
    const fetchHighscore = async () => {
      try {
        const response = await axios.get(
          `https://word-guess-game-rbcp.onrender.com/api/v1/score/getuserscore/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in the header
            },
          }
        );
        const { scores } = response.data;
        const highscore = Math.max(...scores, 0); // Get the highest score
        setUserHighscore(highscore);
        setHighscore(highscore);
      } catch (error) {
        console.error("Error fetching highscore:", error);
      }
    };
    fetchHighscore();
  }, [userId, token]);

  const displayMessage = (text) => setMessage(text);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const saveScore = async (newScore) => {
    try {
      const response = await axios.post(
        "https://word-guess-game-rbcp.onrender.com/api/v1/score/savescore",
        { score: newScore },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Score saved successfully:", response.data);
    } catch (error) {
      console.error(
        "Error saving score:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCheck = () => {
    const number = Number(inputValue);

    if (!number) {
      displayMessage("Please write a number...");
    } else if (number === secretNumber) {
      displayMessage("You win! Great Job!");
      saveScore(score); // Save the new highscore

      document.body.style.backgroundColor = "rgb(36, 94, 22)";
      if (score > userHighscore) {
        setUserHighscore(score);
        fireConfetti(); // Trigger confetti effect
        saveScore(score); // Save the new highscore
        setHighscore(score); // Update local highscore state
      }
      // Prevent further guessing and only allow restarting
      setInputValue("");
    } else {
      if (score > 1) {
        displayMessage(number > secretNumber ? "Too high..." : "Too low...");
        setScore((prevScore) => prevScore - 1);
      } else {
        displayMessage("You lost! Please restart...");
        saveScore(score); // Save the score when the game is lost
        setScore(0);
        setInputValue("");
      }
    }
  };

  const handleRestart = () => {
    // Reset the game state
    setScore(10);
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    displayMessage("Start playing...");
    setInputValue("");
    document.body.style.backgroundColor = "#111";

    // Reset the animation
    const gameContainer = document.querySelector(".game-container");
    gameContainer.classList.remove("lost-animation"); // Remove any previous animation
    void gameContainer.offsetWidth; // Trigger reflow
    gameContainer.classList.add("lost-animation"); // Add the animation class
  };

  return (
    <div className="game-container">
      <header>
        <button type="button" className="btn again" onClick={handleRestart}>
          Restart!
        </button>
        <div className="number-range-text">
          <p className="number-range">(Any number between 1 and 20)</p>
          <h1>Guess My Number</h1>
        </div>

        <section className="secret-number">
          <p className="hidden-number">?</p>
        </section>
      </header>

      <main>
        <article className="main-container">
          <section className="left">
            <input
              type="number"
              className="number-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={
                message === "You win! Great Job!" ||
                message === "You lost! Please restart..."
              } // Disable input if game is won or lost
            />
            <button
              type="submit"
              className="btn submit-number"
              onClick={handleCheck}
            >
              Check!
            </button>
          </section>

          <section className="right">
            <h2 className="message">{message}</h2>
            <p className="label-score">
              Score: <span className="score">{score}</span>
            </p>
            <p className="label-highscore">
              Highest Score: <span className="highscore">{highscore}</span>
            </p>
          </section>
        </article>
      </main>
    </div>
  );
};

export default GuessMyNumber;
