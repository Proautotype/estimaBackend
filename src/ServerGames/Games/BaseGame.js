import DatabaseService from "../../services/DatabaseService";
class BaseGame {
    gameRoom = "";
    gameOwner = "";
    gamePlayers = [];
    DatabaseService = new DatabaseService()
    createGame();
    joinGame();
    leaveGame();
}