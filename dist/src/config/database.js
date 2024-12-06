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
// Initialize Sequelize with configuration
const sequelize = new _sequelize.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup'
});

//# sourceMappingURL=database.js.map