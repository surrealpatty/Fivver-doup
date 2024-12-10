"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
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
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free', // Default role value
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free', // Default tier value
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default verification status
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
});
