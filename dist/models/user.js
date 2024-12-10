"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/user.ts
const sequelize_1 = require("sequelize");
const database_1 = require("@config/database"); // Adjust this import based on your project structure
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Auto-generate UUID
        primaryKey: true,
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
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free',
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free',
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
});
