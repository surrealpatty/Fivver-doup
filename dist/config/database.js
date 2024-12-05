"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Define your database connection here
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root', // Your MySQL username
    password: '', // Your MySQL password (empty in your case)
    database: 'fiverr_clone', // Your database name
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map