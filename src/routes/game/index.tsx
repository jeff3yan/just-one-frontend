import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGame } from '../common/Context';
import socket from '../../socket';
import { sortByRank } from '../../utils/sort';
import { Player } from '../../models';
import { getOrCreateSessionId } from '../../utils/session';

const GameComponent = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { gameData, setGameData } = useGame();

  useEffect(() => {
    // TODO: Listen for changes to the game from the server
    socket.on('game-data-updated', (gameData) => {
      setGameData(gameData);
    });
  });

  useEffect(() => {
    // Fetch game data when the component mounts or when gameId changes
    const fetchGameData = () => {
      socket.emit(
        'get-game-data',
        { gameId },
        (response: { success: boolean; gameData?: any; error?: string }) => {
          if (response.success && response.gameData) {
            setGameData(response.gameData); // Update the context state

            // Join the game only if it's in the 'created' status
            if (response.gameData.game.status === 'created') {
              joinGame(response.gameData.game.id);
            }
          } else {
            console.error('Error fetching game data:', response.error);
          }
        }
      );
    };

    if (gameId) {
      fetchGameData();
    }

    return () => {
      // Cleanup if needed
    };
  }, [gameId, setGameData]);

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

  return (
    <div>
      <h1>Game Details</h1>
      <p>Game ID: {gameId}</p>
      {gameData ? (
        <div>
          <h2>Game Status: {gameData.game.status}</h2>
          <h3>Players:</h3>
          <ul>
            {gameData.players.sort(sortByRank).map((player: Player) => (
              <li key={player.id}>
                #{player.rank} - {player.nickname}{' '}
                {player.session_id === getOrCreateSessionId() ? '(you)' : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading game data...</p>
      )}
    </div>
  );
};

export default GameComponent;
