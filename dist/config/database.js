"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Create a new Sequelize instance
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
});
exports.default = sequelize; // Default export of sequelize instance
//# sourceMappingURL=database.js.map