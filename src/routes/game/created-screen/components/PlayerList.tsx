import React from 'react';
import { Player } from '../../../../models';
import { sortByRank } from '../../../../utils/sort';

interface PlayerListProps {
  players: Player[];
}

export const PlayerList = ({ players }: PlayerListProps) => (
  <>
    <h3>Players:</h3>
    <ul>
      {players.sort(sortByRank).map((player) => (
        <li key={player.id}>
          (#{player.rank}) - {player.nickname}
        </li>
      ))}
    </ul>
  </>
);
