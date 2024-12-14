import { useState, useCallback } from 'react';
import { GameData } from '../../../../models';

export const useGameTurns = (gameData: GameData | null) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTurn, setCurrentTurn] = useState(1);

  const nextTurn = useCallback(() => {
    if (!gameData) return;

    const totalPlayers = gameData.players.length;
    if (currentTurn < totalPlayers) {
      setCurrentTurn((prev) => prev + 1);
    } else {
      setCurrentTurn(1);
      setCurrentRound((prev) => prev + 1);
    }
  }, [gameData, currentTurn]);

  return {
    currentRound,
    currentTurn,
    nextTurn,
    // isGameComplete: currentRound > (gameData?.game?.numRounds ?? 1),
  };
};
