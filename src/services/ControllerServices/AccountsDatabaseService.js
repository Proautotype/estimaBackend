//npm dependencies
//project dependencies
const { joiAccountDetailValidator } = require("../../utils/joiValidators/AccountDetailsValidator");
const { enlistEmptyProperties } = require("../../utils/utility");

async function createUserAccount(body) {
    //check and balance your body
    const checked = enlistEmptyProperties(body);
    if (checked.length > 0) {
        return {
            status: "error",
            message: checked.toLocaleString()
        }
    }
    //if none is empty validate
    const afterValidate = joiAccountDetailValidator(body);  
    if(typeof afterValidate['error'] !== "undefined"){
        //send error details
        return {
            status: "error",
            message: afterValidate['error']['details'][0]['message']
        };
    }
    // useraccount().create({
    //     email: body?.email, 
    //     phone: body?.phone,
    //     accountType: body?.plan,
    //     accountName: body?.organization
    // })
}

module.exports = {
    createUserAccount
}