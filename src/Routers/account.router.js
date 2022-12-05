const UserAccountRouter = require('express').Router();
const { createUser, loginUser, getAccount } = require('../controllers/UserAccount.controller');

UserAccountRouter.post("/create",createUser)
UserAccountRouter.post("/login", loginUser)
UserAccountRouter.get("/getAccount", getAccount)

module.exports = UserAccountRouter;