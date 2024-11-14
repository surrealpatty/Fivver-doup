"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Assuming sequelize is properly exported from database.ts
class User extends sequelize_1.Model {
}
// Initialize the model with proper column definitions
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that the username is unique
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that the email is unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Free',
    },
    subscriptionStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Inactive',
    },
    subscriptionStartDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    subscriptionEndDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false, // Optional: set to `true` if you want `createdAt` and `updatedAt`
});
exports.default = User;
//# sourceMappingURL=user.js.map