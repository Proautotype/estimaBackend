const joi = require("joi");

module.exports = {
    joiCreateAccountSchema: joi.object({
        email: joi.string().email().required(),
        accountName: joi.string().min(5).max(100).required().alphanum(),
        phone: joi.string().min(10).required(),
        pin: joi.number().min(9999).max(99999999).required(),
        accountTypeId: joi.number().min(1).max(2)
    })
}