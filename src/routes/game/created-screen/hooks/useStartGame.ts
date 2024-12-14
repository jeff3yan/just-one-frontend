import { useCallback, useState } from 'react';
import { useGame } from '../../../common/Context';
import socket from '../../../../socket';
import { GameData } from '../../../../models';

interface StartGameResponse {
  success: boolean;
  gameData?: GameData;
  error?: string;
}

export const useStartGame = () => {
  const { setGameData } = useGame();

  const startGame = useCallback(
    (gameId: string, numberOfRounds: number) => {
      socket.emit(
        'start-game',
        {
          gameId,
          numberOfRounds,
        },
        (response: StartGameResponse) => {
          if (response.success && response.gameData) {
            setGameData(response.gameData);
          } else {
            const error = response.error || 'Failed to start game';
            console.error(error);
            throw new Error(error);
          }
        }
      );
    },
    [setGameData]
  );

  return {
    startGame,
  };
};
