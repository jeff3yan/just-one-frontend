import React from 'react';

interface RoundSelectorProps {
  numRounds: number;
  onRoundsChange: (rounds: number) => void;
}

export const RoundSelector = ({
  numRounds,
  onRoundsChange,
}: RoundSelectorProps) => (
  <div>
    <label htmlFor="rounds">Number of Rounds: </label>
    <select
      id="rounds"
      value={numRounds}
      onChange={(e) => onRoundsChange(Number(e.target.value))}
    >
      <option value={1}>1 Round</option>
      <option value={2}>2 Rounds</option>
      <option value={3}>3 Rounds</option>
    </select>
  </div>
);
