export interface Game {
  id: string;
  name: string;
  status: 'created' | 'started' | 'completed';
  created_at: string;
}

export interface Player {
  id: string;
  nickname: string;
  rank: string;
  session_id: string;
  turn_order: number;
}

export interface GameData {
  game: Game;
  players: Player[];
}
