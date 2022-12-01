require("dotenv").config();
module.exports = {
    "development": {
        "username": process.env.YUSA_NAME,
        "password": process.env.PASW3D,
        "database": process.env.DETABES,
        "host": process.env.DETABES_URL,
        "dialect": process.env.DAIL3KT
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
}