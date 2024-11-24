import React from 'react';
import { useGame } from '../../common/Context';
import { PlayerList } from './components/PlayerList';
import { RoundSelector } from './components/RoundSelector';
import { GameControls } from './components/GameControls';

const CreatedGame = () => {
  const { gameData } = useGame();
  const [numRounds, setNumRounds] = React.useState(1);

  return (
    <div>
      <h2>Game is Created</h2>
      <p>Waiting for the game to start...</p>

      <RoundSelector numRounds={numRounds} onRoundsChange={setNumRounds} />

      <GameControls gameId={gameData?.game?.id} numRounds={numRounds} />

      <PlayerList players={gameData?.players ?? []} />
    </div>
  );
};

export default CreatedGame;
