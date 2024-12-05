// src/config/database.ts
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
// Define your database connection here
const sequelize = new _sequelize.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'fiverr_clone'
});

//# sourceMappingURL=database.js.map