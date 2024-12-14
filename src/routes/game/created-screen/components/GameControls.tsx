import React, { useState } from 'react';
import { useStartGame } from '../hooks/useStartGame';

interface GameControlsProps {
  gameId?: string;
  numRounds: number;
}

export const GameControls = ({ gameId, numRounds }: GameControlsProps) => {
  const { startGame } = useStartGame();
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async () => {
    if (!gameId) return;

    setError(null);

    try {
      startGame(gameId, numRounds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    }
  };

  return (
    <div>
      <button onClick={handleStartGame} disabled={!gameId}>
        Start Game
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
