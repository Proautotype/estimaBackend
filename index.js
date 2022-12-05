const express = require("express");
const fs = require("fs");
const http = require("http");
const { Server, Socket } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const { testDBConnection, DBsequelize, ShowcardMemberModel, ShowCardModel, ShowcardScoreBoardModel, ShowCardSessionRegistryModel } = require("./DB/index.js");
const { uuid } = require('uuidv4');
const DatabaseService = require("./src/services/DatabaseService");
const showcard_router = require("./src/Routers/showcard.router.js");
const ShowcardSocket = require("./src/SocketRouters/Showcard.socket.js");
const EmailService = require("./src/services/EmailService.js");
const UserAccountRouter = require("./src/Routers/account.router.js");
//server app setup and registries
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
);
//binding server app and IO;
const IO = new Server(server, { cors: {} });
//checking database config and connection
testDBConnection();
const DBS = new DatabaseService();
//routes
app.use('/userAccount', UserAccountRouter);
app.use('/showcard', showcard_router);

IO.on("connection", async socket => {
  socket.on("create-server", async (data) => {
    //where room is the server created by user in the database
    socket.chatID = data?.chatID
    socket.join(data?.room);
    console.log('data-> | <-data', data?.room)
  })

  socket.on("join-server", async (data) => {
    socket.chatID = data?.chatID;
    socket.join(data?.room);
    //notify everyone that someone has joined    
    //get all clients connected to this server
    const clients = await IO.in(data?.room).fetchSockets();
    const members = []
    //foreach client or member fetch details about client
    for (let client of clients) {
      const member = await DBS.PowerPoint(ShowcardMemberModel, 'chatID', client?.chatID);
      //fetch available or current server session scorecard of the user
      const [session] = await DBS.QueryRunner(`
      select * from showcardsessionregistries where 
      showcardsessionregistries.sessionIndex = 
      (select max(sessionIndex) from  showcardsessionregistries)
      and showcardsessionregistries.showcardid = ?`,
        [member?.getDataValue('ShowCardId')]);
      //now fetch score
      const score = await
        DBS.PowerPoint2(ShowcardScoreBoardModel,
          ['showcardSessionRegistryId', 'showcardMemberId'],
          [session[0]['id'], member?.getDataValue('id')]);
      //combine details and push
      members.push({
        memberName: member?.getDataValue("memberName"),
        chatID: member?.getDataValue("chatID"),
        scorecard: score ? score?.getDataValue("score") : null,
        visibility: false
      });
    }
    //send others to current member    
    // socket.emit("other-Members", members);
    //notify all 
    IO.to(data?.room).emit("new-Member", [...members]);
    //send a recovery mail to user
    // emailServer.sendMail(data?.email,'recovery mail',uuid().slice(0,5));
  });

  socket.on("cast-number", async (data) => {
    console.log('cast ', data)
    const member = await DBS.PowerPoint(ShowcardMemberModel, 'chatID', data?.chatID);
    //fetch available or current server session scorecard of the user
    const [currentSession] = await DBS.GetCurrentSession([member?.getDataValue('ShowCardId')])
    console.log('current session => , ', currentSession)
    const preparedStatement = ShowcardScoreBoardModel.build({
      score: data?.score,
      showcardMemberId: member.getDataValue("id"),
      showcardSessionRegistryId: currentSession[0]['id']
    });
    preparedStatement.save().then(()=>{
      IO.to(data?.room).emit("member-casted", {
        scorecard: data?.score,
        chatID: data?.chatID
      });

    });

  })
});

// IO.use(ShowcardSocket);
//spawn server
server.listen(process.env.S3RVA_PORT, () => {
  console.log("listening on ", process.env.S3RVA_PORT);
});

module.exports = IO;
// const showCardDetails = await new DatabaseService().PowerPoint(ShowCardModel,"serverName",data?.server);