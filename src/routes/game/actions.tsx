import { useEffect } from 'react';
import socket from '../../socket';
import { useGame } from '../common/Context';

export const useJoinGame = () => {
  const { setGameData } = useGame();

  // Emit the 'join-game' event when the player joins the game
  const joinGame = (gameId: string) => {
    socket.emit(
      'join-game',
      { gameId },
      (response: { success: boolean; gameData: any; error?: string }) => {
        if (response.success) {
          console.log('Successfully joined the game', response);
          setGameData(response.gameData);
        } else {
          console.error('Failed to join game:', response.error);
        }
      }
    );
  };

  return { joinGame };
};

export const useRefreshGameData = () => {
  const { setGameData } = useGame();

  // Fetch game data when the component mounts or when gameId changes
  const fetchGameData = (gameId: number) => {
    socket.emit(
      'get-game-data',
      { gameId },
      (response: { success: boolean; gameData?: any; error?: string }) => {
        if (response.success && response.gameData) {
          setGameData(response.gameData); // Update the context state
          // Join the game only if it's in the 'created' status
          if (response.gameData.game.status === 'created') {
          }
        } else {
          console.error('Error fetching game data:', response.error);
        }
      }
    );
  };

  return { fetchGameData };
};
