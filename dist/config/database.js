"use strict";
// src/config/database.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Define your database connection here
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'fiverr_clone',
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map