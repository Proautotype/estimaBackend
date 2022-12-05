const { joiCreateAccountSchema } = require("../joiSchemas/AccountDetailsSchema");

module.exports = {
    joiAccountDetailValidator: (body)=>{
        return joiCreateAccountSchema.validate(body);
    }
}