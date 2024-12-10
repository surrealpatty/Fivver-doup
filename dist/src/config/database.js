"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sequelize", {
    enumerable: true,
    get: function() {
        return sequelize;
    }
});
const _sequelize = require("sequelize");
const sequelize = new _sequelize.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false
});
 // Export sequelize instance

//# sourceMappingURL=database.js.map