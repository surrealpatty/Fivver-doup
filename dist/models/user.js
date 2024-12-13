"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/user.ts
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Allow null for the reset token
    },
    resetTokenExpiration: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // Allow null for the reset token expiration
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
//# sourceMappingURL=user.js.map