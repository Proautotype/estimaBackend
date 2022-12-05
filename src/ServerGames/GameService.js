import ShowCardGame from "./Games/ShowCardGame";
import SpoonsGame from "./Games/SpoonsGame";
export class GameService {
  ShowCard = new ShowCardGame();
  Spoons = new SpoonsGame();
  constructor() {}
}
