import { useCallback } from 'react';
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
    (gameId: string, numRounds: number) => {
      return new Promise<GameData>((resolve, reject) => {
        socket.emit(
          'start-game',
          { gameId, numRounds },
          (response: StartGameResponse) => {
            if (response.success && response.gameData) {
              setGameData(response.gameData);
              resolve(response.gameData);
            } else {
              const error = response.error || 'Failed to start game';
              console.error(error);
              reject(new Error(error));
            }
          }
        );
      });
    },
    [setGameData]
  );

  return { startGame };
};
