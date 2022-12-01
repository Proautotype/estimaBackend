export default class ShowCardGame {
    gameSessions = [{ gameRoom: "", gameOwner: "", gameMembers: [] }];
    create(gameDetail) {
      let game = {
          gameRoom: gameDetail.gameRoom,
          gameOwner: gameDetail.gameOwner,
          gameMembers:[gameDetail.gameOwner]
        }
      this.gameSessions.push(game);
      return game;
    }
    addPlayer({player,gameRoom}) {
      const sessionIndx  = this.gameSessions.findIndex(session=>{
        return session.gameRoom === gameRoom
      })
      this.gameSessions[sessionIndx]?.gameMembers.push(player);
      console.log('game sessions ', this.gameSessions);
      console.log('current session ', sessionIndx);
      return this.gameSessions[sessionIndx];
      
    }
    playerMove() {}
    
  }