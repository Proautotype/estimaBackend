const { uuid } = require('uuidv4');
const { ShowCardModel, ShowcardMemberModel, ShowCardSessionRegistryModel, DBsequelize, ShowcardScoreBoardModel, QueryTypes } = require('../DB');
const EmailService = require('./EmailService');
require('dotenv').config();
const emailServer = new EmailService();

class DatabaseService {
  async createShowCardGame(admin, serverName = "", link, id,email) {
    let date = Date.now();
    let sessionReg = uuid();
    let joinid = uuid().slice(0, 8);
    let chatID = uuid();
    const ShowCardGame = ShowCardModel.build({
      id,
      admin,
      serverName,
      dateCreated: date,
      link: link + "" + id
    });
    const MemberModel = ShowcardMemberModel.build({
      id: uuid(),
      memberName: admin,
      ShowCardId: id,
      chatID,
      email,
      joinid,
    });
    const sessionRegistryModel = ShowCardSessionRegistryModel.build({
      id: sessionReg,
      ShowCardId: id,
      sessionIndex: 0,
      sessionName: 'initial',
      state: 'waiting'
    });
    let _ss = await this.findOne(serverName);
    console.log('sss ', _ss);
    if (_ss == null) {
      try {
        const gameCreated = await ShowCardGame.save();
        const memberCreated = await MemberModel.save();
        const sessionRegistryCreated = await sessionRegistryModel.save();
        return {
          state: true,
          body: {
            serverDetails: {
              server: gameCreated.getDataValue("serverName"),
              serverLink: gameCreated.getDataValue("link")
            },
            sessionDetails: {
              name: 'initial',
              state: 'waiting'
            },
            isAdmin: true,
            chatID
          }
        };
      } catch (error) {
        console.dir(error)
        return {
          state: false,
          body: {
            errorNumber: error?.parent?.errno,
            description: error?.name
          }
        }
      }
    } else {
      return {
        state: false, body: {
          errorNumber: 404,
          description: "Server already exist!"
        }
      }
    }
  }
  async findOne(column) {
    return await ShowCardModel.findOne({
      where: {
        serverName: column
      }
    })
  }

  async joinServer(serverName, memberName) {
    const server = await this.PowerPoint(ShowCardModel, "serverName", serverName);
    if (server !== null) {
      const member = await this.PowerPoint2(ShowcardMemberModel,
        ["memberName", "ShowCardId"], 
        [memberName, server?.getDataValue("id")]);
      if (member !== null) {
        emailServer.sendMail(member.getDataValue("email"),'Join Code ',member.getDataValue("joinid"))
        return {
          state: false, body: {
            errorNumber: 303,
            description: `Check your mail, your join key has been sent`
          }
        }
      }
      const chatID = uuid();
      const newMember = ShowcardMemberModel.build({
        id: uuid(),
        memberName: memberName,
        ShowCardId: server?.getDataValue("id"),
        chatID
      });
      const savedMember = newMember.save();
      //after saving we fetch the server's immediate/current session
      const [findCurrentSession] = await DBsequelize
        .query(`select * from showcardsessionregistries where 
            showcardsessionregistries.sessionIndex = 
            (select max(sessionIndex) from  showcardsessionregistries)
            and showcardsessionregistries.showcardid = ?
            `, {
          replacements: [server?.getDataValue("id")]
        });
      //display the results of finding the current session by index
      const rbody = {
        state: true,
        body: {
          serverDetails: {
            server: server.getDataValue("serverName"),
            serverLink: server.getDataValue("link")
          },
          sessionDetails: {
            name: findCurrentSession[0]['sessionName'],
            state: findCurrentSession[0]['state'],
            index: findCurrentSession[0]['sessionIndex']
          },
          isAdmin: false,
          chatid: chatID
        }
      };
      // console.log('results of current session => ', findCurrentSession,rbody);
      return rbody;
    }
    return {
      state: false, body: {
        errorNumber: 404,
        description: "No such server!"
      }
    }
  }

  async PowerPoint(Model, column, value) {
    return await Model.findOne({
      where: {
        [column]: value,
      }
    })
  }

  async PowerPoint2(Model, column = [], value = []) {
    return await Model.findOne({
      where: {
        [column[0]]: value[0],
        [column[1]]: value[1],
      }
    })
  }

  async QueryRunner(sql, replacement) {
    return await DBsequelize
      .query(sql, {
        replacements: [...replacement]
      });
  }

  async GetCurrentSession(replacement = []) {
    const sql = `select * from showcardsessionregistries where 
    showcardsessionregistries.sessionIndex = 
    (select max(sessionIndex) from  showcardsessionregistries)
    and showcardsessionregistries.showcardid = ?`;
    return await this.QueryRunner(sql, replacement);
  }

}

module.exports = DatabaseService;
