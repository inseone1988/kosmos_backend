const {Sequelize} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    dialectOptions : {
        multipleStatements: true
    }
});

sequelize.syncTables = async function () {
    const fs = require("fs");
    const path = require("path");
    const sql = fs.readFileSync(path.join(__dirname, "../create_stored_procedures.sql")).toString();
    try {
        await sequelize.sync();
        await sequelize.query(sql);
    }catch (e) {
        console.log(e);
    }

}

module.exports = sequelize;
