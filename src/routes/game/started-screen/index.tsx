// StartedGame.tsx
import React from 'react';
import { getOrCreateSessionId } from '../../../utils/session';
import { Player } from '../../../models';
import { useGame } from '../../common/Context';

const StartedGame = () => {
  const { gameData, setGameData } = useGame();

  if (!gameData) {
    return null;
  }

  return (
    <div>
      <h2>Game Started</h2>
      <p>The game is in progress...</p>

      <h3>Players:</h3>
      <ul>
        {gameData.players
          .sort((a, b) => a.turn_order - b.turn_order)
          .map((player: Player) => (
            <li key={player.id}>
              #{player.rank} - {player.nickname}{' '}
              {player.session_id === getOrCreateSessionId() ? '(you)' : null}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StartedGame;
