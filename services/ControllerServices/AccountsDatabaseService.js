const useraccount = require("../../models/useraccount");
const { enlistEmptyProperties } = require("../../utils/utility");

function createUserAccount(body){
    //check and balance your body
    const checked = enlistEmptyProperties(body);
    console.log("checked ", checked)
    if(checked.length > 0){
        return {
            status:"error",
            message:checked.toLocaleString()
        }
    }
    useraccount().create({
        email: body?.mail, 
        phone: body?.phone,
        accountType: body?.plan,
        accountName: body?.organization
    })
}

module.exports = {
    createUserAccount
}