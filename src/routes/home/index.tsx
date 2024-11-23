import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../socket';
import { Game } from '../../models';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set loading to true when fetching games
    setLoading(true);

    // Emit event to fetch active games
    socket.emit(
      'get-active-games',
      {},
      (response: { success: boolean; games?: Game[]; error?: string }) => {
        setLoading(false); // Set loading to false after fetching
        if (response.success && response.games) {
          setGames(response.games);
        } else {
          setError(response.error || 'Failed to fetch games');
        }
      }
    );

    return () => {};
  }, []);

  // Navigate to the selected game
  const joinGame = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  // Handle creating a new game
  const createGame = () => {
    socket.emit(
      'create-game',
      {},
      (response: { success: boolean; game?: Game; error?: string }) => {
        if (response.success && response.game) {
          navigate(`/game/${response.game.id}`); // Redirect to the new game page
        } else {
          setError(response.error || 'Error creating game');
        }
      }
    );
  };

  return (
    <div>
      <h1>Active Games</h1>
      <button onClick={createGame} disabled={loading}>
        {loading ? 'Creating...' : 'Create New Game'}
      </button>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {loading ? (
        <p>Loading games...</p>
      ) : (
        <ul>
          {games.length > 0 ? (
            games.map((game) => (
              <li
                key={game.id}
                onClick={() => joinGame(game.id)}
                style={{ cursor: 'pointer' }}
              >
                {game.id} - {game.status}
              </li>
            ))
          ) : (
            <p>No active games available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Home;
