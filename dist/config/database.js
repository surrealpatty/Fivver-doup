"use strict";
// src/config/database.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
// Initialize Sequelize with configuration
var sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
});
exports.sequelize = sequelize;
