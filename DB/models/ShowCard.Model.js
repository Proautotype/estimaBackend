const { Sequelize, DataTypes, Model } = require('sequelize');
const { DBsequelize } = require('..');
//initialize showcard
// const ShowCardModel = DBsequelize.define('ShowCard', {
//     id: {
//         type: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     admin: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     serverName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     dateCreated: {
//         type: DataTypes.DATE
//     },
//     link: {
//         type: DataTypes.STRING
//     }
// })

// module.exports = ShowCardModel;