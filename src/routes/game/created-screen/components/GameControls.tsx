import React, { useState } from 'react';
import { useStartGame } from '../hooks/useStartGame';

interface GameControlsProps {
  gameId?: string;
  numRounds: number;
}

export const GameControls = ({ gameId, numRounds }: GameControlsProps) => {
  const { startGame } = useStartGame();
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartGame = async () => {
    if (!gameId) return;

    setIsStarting(true);
    setError(null);

    try {
      await startGame(gameId, numRounds);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div>
      <button onClick={handleStartGame} disabled={!gameId || isStarting}>
        {isStarting ? 'Starting...' : 'Start Game'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
