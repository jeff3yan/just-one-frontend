import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { GameData } from '../../models';

interface GameContextType {
  gameData: GameData | null;
  setGameData: React.Dispatch<React.SetStateAction<GameData | null>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [gameData, setGameData] = useState<GameData | null>(null);

  return (
    <GameContext.Provider value={{ gameData, setGameData }}>
      {children}
    </GameContext.Provider>
  );
};
