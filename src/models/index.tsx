export interface Game {
  id: string;
  name: string;
  status: string;
  created_at: string;
}

export interface Player {
  id: string;
  nickname: string;
  rank: string;
  session_id: string;
}

export interface GameData {
  game: Game;
  players: Player[];
}
