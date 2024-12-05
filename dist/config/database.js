"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Initialize Sequelize instance
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql', // or your database dialect
    host: 'localhost', // your database host
    username: 'root', // your database username
    password: '', // your database password
    database: 'fiverr_doup', // your database name
});
//# sourceMappingURL=database.js.map