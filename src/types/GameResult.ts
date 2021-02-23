import GameInfo from "./GameInfo";

export default interface GameResult {
  name: string;
  time: string;
  preferences: Object;
  gameInfo: GameInfo;
}
