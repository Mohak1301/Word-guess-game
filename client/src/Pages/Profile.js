import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file
import Leaderboard from '../Components/Leaderboard';

const Profile = () => {
  const [user, setUser] = useState({});
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and scores
    const fetchUserDataAndScores = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        // Assuming the backend route is structured to accept the token to get user data
        const res = await axios.get('http://localhost:5100/api/v1/score/getuserscore/66e30d50679335e6891b50f0', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Debugging: Log the response to verify its structure
        console.log('API Response:', res.data);

        if (res.data.user) {
          setUser(res.data.user);
        } else {
          console.error('User data not found in response');
        }

        if (Array.isArray(res.data.scores)) {
          setScores(res.data.scores);
        } else {
          console.error('Scores data is not an array or not found in response');
        }
      } catch (error) {
        console.error('Error fetching user data and scores:', error);
      }
    };

    fetchUserDataAndScores();
  }, []);

  const handleGameRedirect = () => {
    navigate('/user/game'); // Redirect to game page
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>

        <div className="game-card" onClick={handleGameRedirect}>
          <h3>Play My Game</h3>
          <p>Click to start playing!</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="user-scores">
          <h2>Past Scores</h2>
          {scores.length > 0 ? (
            <ul>
              {scores.map((score, index) => (
                <li key={index}>Score: {score}</li>
              ))}
            </ul>
          ) : (
            <p>No scores available</p>
          )}
        </div>

          <div className='leaderboard-div'>
            
        <Leaderboard />
          </div>
      </div>
    </div>
  );
};

export default Profile;
