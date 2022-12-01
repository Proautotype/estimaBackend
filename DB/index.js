const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const { DETABES_URL, DETABES, YUSA_NAME, PASW3D, DAIL3KT } = process.env;

const DBsequelize = new Sequelize(
    DETABES, YUSA_NAME, PASW3D,
    {
        host: DETABES_URL,
        dialect: DAIL3KT,
    });

async function testDBConnection() {
    try {
        await DBsequelize.authenticate();
        createTables(false);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const ShowCardModel = DBsequelize.define('ShowCard', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    admin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    serverName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dateCreated: {
        type: DataTypes.DATE
    },
    link: {
        type: DataTypes.STRING
    }
}, {
    DBsequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

const ShowcardMemberModel = DBsequelize.define("showcard_members", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    memberName: {
        type: DataTypes.STRING,
    },
    chatID:{
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    joinid: {
        type: DataTypes.STRING,
    },
}, {
    DBsequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})

const ShowCardSessionRegistryModel = DBsequelize.define("showcardSessionRegistry", {
    id: {
        type: DataTypes.STRING,
        primaryKey:true
    },
    sessionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sessionIndex:{
        type: DataTypes.INTEGER
    },
    state: {
        type: DataTypes.ENUM("waiting","started","closed"),
        defaultValue:'waiting'
    },
},{
    DBsequelize,
    createdAt: false,
    updatedAt: false
});

const ShowcardScoreBoardModel = DBsequelize.define("showcardScoreBoard",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    score:{
        type:DataTypes.INTEGER,        
    }
}, {
    DBsequelize,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
});

async function createTables(force = false, alter = false) {
    ShowCardSessionRegistryModel.belongsTo(ShowCardModel);
    ShowCardModel.hasOne(ShowcardMemberModel);
    ShowCardSessionRegistryModel.belongsToMany(ShowcardMemberModel,{
        through:ShowcardScoreBoardModel,
        uniqueKey:"Member_session_uqk"
    });
    await ShowCardModel.sync({ force,alter });
    await ShowcardMemberModel.sync({ force,alter });
    await ShowCardSessionRegistryModel.sync({ force,alter });
    await ShowcardScoreBoardModel.sync({ force,alter });
}

module.exports = { DBsequelize, testDBConnection, ShowCardModel,  ShowcardScoreBoardModel, ShowcardMemberModel,ShowCardSessionRegistryModel };