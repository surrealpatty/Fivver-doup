"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'fiverr_clone',
    models: [__dirname + '/models'], // Path to your models directory
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map