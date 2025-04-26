import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/api/matches');

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      const result = await response.json();
      setMatches(result.data.matches);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchMatches();
  }, []);

  //Function to format date

  const formatDate = (dateString) => {
    const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <header className="header">
        <h1>Welcome to PitchBuddy!</h1>
        <p>AI-Powered Football Match Recommendations</p>
      </header>

      <nav className="navbar">
        <ul>
          <li><a href="/" className='active'>Home</a></li>
          <li><a href="/matches">Matches</a></li>
          <li><a href="/leagues">Leagues</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>

      <div className="app-container">
        <main className="main-content">
          <h2 className="section-title">Recommended Matches</h2>

          {loading ? (
            <div className='loading'>
              <div className="spinner"></div>
              </div>
          ) : error ? (
            <div className="error-message">
              Error: {error}
            </div>
          ) : (
            <div className="matches-grid">
              {matches.map((match) => (
                <div key={match.id} className="match-card">
                  <div className="match-card-header">
                    <h3>{match.league}</h3>
                  </div>
                  <div className="match-card-body">
                    <div className="match-teams">
                      <div className="team">
                        <h4>{match.home_team}</h4>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team">
                        <h4>{match.away_team}</h4>
                      </div>
                    </div>

                    <div className="match-details">
                      <div className="match-detail-item">
                        <span>Date:</span>
                        <span>{formatDate(match.date)}</span>
                      </div>
                      <div className="match-detail-item">
                        <span>Time:</span>
                        <span>{match.time}</span>
                      </div>
                      <div className="match-detail-item">
                        <span>Venue:</span>
                        <span>{match.venue}</span>
                      </div>
                      </div>

                      <div className="match-interest">
                        <h4>Interest Rating: {match.interest_factors.game_interest}/10</h4>
                        <div className="interest-meter">
                          <div 
                          className="interest-level"
                          style={{width: `${match.interest_factors.game_interest * 10}%`}}
                          ></div>
                        </div>

                        <div className="interest-details">
                          <div className="match-detail-item">
                            <span>Team Form:</span>
                            <span>{match.interest_factors.form}/10</span>
                        </div>
                        <div className="match-detail-item">
                          <span>Rivalry:</span>
                          <span>{match.interest_factors.rivalry}/10</span>
                        </div>
                        <div className="match-detail-item">
                          <span>Stakes:</span>
                          <span>{match.interest_factors.stakes}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                

                <div className="match-card-footer">
                  <button className="btn">View Details</button>
                </div>
                </div>
              ))}
            </div>
          )}
        </main>
        </div>
        </div>
        );
      }
    

export default App;
