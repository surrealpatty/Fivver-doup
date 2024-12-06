"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Initialize Sequelize with configuration
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
});
// Export sequelize instance for use in other parts of your application
exports.default = sequelize;
//# sourceMappingURL=database.js.map