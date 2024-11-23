import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './routes/game';
import Home from './routes/home';
import socket from './socket';

function App() {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    socket.connect();

    // Listen for the 'assign-nickname' event
    socket.on('assign-nickname', (data: { nickname: string }) => {
      console.log(`Received nickname: ${data.nickname}`);
      setNickname(data.nickname);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <div>
        <h1>Welcome to Just One Game</h1>
        {nickname ? (
          <h2>Your Nickname: {nickname}</h2>
        ) : (
          <p>Loading your nickname...</p>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
