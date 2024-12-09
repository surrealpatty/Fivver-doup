"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../config/database"); // Named import for sequelize
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free', // You can set a default role
    },
    tier: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'free', // You can set a default tier
    }
}, {
    sequelize: database_1.sequelize, // The sequelize instance from config/database.ts
    modelName: 'User',
});
database_1.sequelize.models.User = User; // Add the User model to sequelize instance
