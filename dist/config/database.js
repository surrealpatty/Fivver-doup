"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password', // Adjust this to your password if needed
    database: 'fivver_doup', // Your database name
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map