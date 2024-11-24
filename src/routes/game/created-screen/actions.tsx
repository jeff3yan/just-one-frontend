import { useGame } from '../../common/Context';
import socket from '../../../socket';

export const useStartGame = () => {
  const { setGameData } = useGame();

  const startGame = (gameId: string, numRounds: number) => {
    socket.emit(
      'start-game',
      { gameId, numRounds },
      (response: { success: boolean; gameData?: any; error?: string }) => {
        if (response.success && response.gameData) {
          setGameData(response.gameData);
        } else {
          console.error('Failed to start game:', response.error);
        }
      }
    );
  };

  return { startGame };
};
