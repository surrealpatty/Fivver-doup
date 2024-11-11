"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Ensure correct import of sequelize instance
// Define the User model
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Optional, not required
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Optional, not required
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize, // Using the imported sequelize instance
    modelName: 'User',
    tableName: 'users', // Ensure the table name matches your database schema
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});
//# sourceMappingURL=user.js.map