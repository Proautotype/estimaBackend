const DatabaseService = require('../services/DatabaseService');
const DBService = new DatabaseService();
require('dotenv').config();
const showcardRouter = require('express').Router();

showcardRouter.post('/create', async (req, res) => {
    const body = req.body;
    let link = req.headers.origin + "/games" + req.baseUrl + "/";
    console.log('creating....')
    const service = await DBService.createShowCardGame(
        body?.admin,
        body?.server,
        link,
        body?.ID,
        body?.adminAsMember,
        body?.email
    );
    if (service.state) {
        res.status(201).send(service); 
    } else {
        res.status(401).send(service);
        console.log('failed')
    }
})

showcardRouter.post("/join", async (req, res) => {
    const { serverName, memberName } = req.body;
    const service = await DBService.joinServer(serverName, memberName);
    if(service.state){
        res.status(201).send(service);
    }else{
        if(service.body.errorNumber === 404){
            res.status(service.body.errorNumber).send(service);
        }else if(service.body.errorNumber === 403){
            res.status(service.body.errorNumber).send(service);
        }
    }
    // console.log(IO)
})
module.exports = showcardRouter;