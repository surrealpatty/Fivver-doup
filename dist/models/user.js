"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Adjust path if necessary
// Define the User model
const User = database_1.sequelize.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.TIMESTAMP,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
});
// Sync the model with the database, creating the table if it doesn't exist
User.sync({ alter: true }).then(() => {
    console.log('User table is synced');
}).catch((error) => {
    console.error('Error syncing User model:', error);
});
exports.default = User;
//# sourceMappingURL=user.js.map