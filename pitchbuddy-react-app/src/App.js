import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [WelcomeMessage, setWelcomeMessage] = useState('');
  const [Match, setMatch] = useState('');
  const [Players, setPlayers] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/')
    .then(response => response.text())
    .then(data => setWelcomeMessage(data))
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/match/matchname')
    .then(response => response.text())
    .then(data => setMatch(data));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/players/matchname')
    .then(response => response.text())
    .then(data => setPlayers(data));
  }, []);

  return (
    <div className="App">
     <h1>{WelcomeMessage}</h1>

     <nav className='navbar'>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/match">Match</a></li>
        <li><a href="/players">Players</a></li>
      </ul>
     </nav>

    <div className="match">
      <h2>Matches</h2>
      <p>{Match}</p>
      </div>
    <div className="players">
      <h2>Players</h2>
      <p>{Players}</p>
      </div>
    </div>
  );
}

export default App;
