const { DBsequelize } = require("../DB");

class DatabaseService2 {   
    createUser(userid, username, email, password) {
      let sql = "INSERT INTO ?? (userid,name,email,password) VALUES(?,?,?,?)";
      let inserts = ["users", userid, username, email, password];
      sql = mysql.format(sql, inserts);
      this.connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        console.log("results ", results);
        return results;
      });
    }
    loginUser(email, password) {
      let sql = "SELECT * from USERS where email = ? and password = ?";
      let inserts = [email, password];
      sql = mysql.format(sql, inserts);
      this.connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("results ", results);
        return results;
      });
    }
  }
module.exports = DatabaseService2;