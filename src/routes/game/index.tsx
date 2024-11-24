import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../common/Context';
import socket from '../../socket';
import CreatedGame from './created-screen';
import StartedGame from './started-screen';
import CompletedGame from './completed-screen';
import { useJoinGame } from './actions';

const GameComponent = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { gameData, setGameData } = useGame();
  const { joinGame } = useJoinGame();

  useEffect(() => {
    socket.on('game-data-updated', (gameData) => {
      setGameData(gameData);
    });
  });

  useEffect(() => {
    if (gameId) {
      joinGame(gameId);
    }
  }, [gameId]);

  // Render different components based on game status
  if (!gameData) {
    return <p>Loading game data...</p>;
  }

  const { status } = gameData.game;

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: 'white',
          padding: '1rem',
          borderBottom: '1px solid #ccc',
          zIndex: 100,
        }}
      >
        <h1>Game Details</h1>
        <p>Game ID: {gameId}</p>
        <h2>Game Status: {status}</h2>
      </div>

      <div style={{ marginTop: '160px' }}>
        {status === 'created' && <CreatedGame />}
        {status === 'started' && <StartedGame />}
        {status === 'completed' && <CompletedGame />}
      </div>
    </div>
  );
};

export default GameComponent;
