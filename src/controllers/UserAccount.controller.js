const { createUserAccount } = require("../services/ControllerServices/AccountsDatabaseService");

module.exports = {
    createUser: async (req, res) => {  
        try {            
           const created = await createUserAccount(req.body);
           if(created.status === "error"){
            res.status(401).send(created.message);
            return
           }
           res.status(201).send("created");
        } catch (error) {
            console.debug(error);
        }
    },
    loginUser: async (req, res) => {
        try {


        } catch (error) {
            console.debug(error);
        }
    },
    getAccount: async (req, res) => {
        try {

        } catch (error) {
            console.debug(error);
        }
    }
}
