import React from 'react';
import { Player } from '../../../../models';

interface PlayerListProps {
  players: Player[];
}

export const PlayerList = ({ players }: PlayerListProps) => (
  <>
    <h3>Players:</h3>
    <ul>
      {players
        .sort((a, b) => a.turn_order - b.turn_order)
        .map((player) => (
          <li key={player.id}>
            (#{player.rank}) - {player.nickname}
          </li>
        ))}
    </ul>
  </>
);
