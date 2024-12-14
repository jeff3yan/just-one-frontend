// CompletedGame.tsx
import React from 'react';
import { useGame } from '../../common/Context';

const CompletedGame = () => {
  const { gameData, setGameData } = useGame();

  if (!gameData) {
    return null;
  }

  return (
    <div>
      <h2>Game Completed</h2>
      <p>The game has ended.</p>
      <h3>Final Results:</h3>
      <ul>
        {gameData.players.map((player: any) => (
          <li key={player.id}>
            {player.nickname} - Rank: {player.rank}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedGame;
