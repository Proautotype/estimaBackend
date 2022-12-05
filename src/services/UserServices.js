import { v4 as uuidv4 } from "uuid";
import { randomName } from "../utils/utility";

class UserServices {
  USERS = [];
  findUserByName(name) {      
      console.log("ss",name, this.USERS.find(user => user.name == name));
    return this.USERS.find(user => user.name == name);
  }
  addUser(name) {
    let nId = uuidv4();
    if (!this.findUserByName(name)) {
        this.USERS.push({ name, id: nId });
        return name;
    }else{
        return this.addUser(name+randomName())        
    }
  }
  findAllUsers() {
    return this.USERS;
  }
}

export default new UserServices();