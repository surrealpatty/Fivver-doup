"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Use named import
// Define the User model class
class User extends sequelize_1.Model {
}
// Initialize the model
User.init({
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
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
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
}, {
    sequelize: database_1.sequelize, // Reference the sequelize instance here
    tableName: 'users',
});
exports.default = User;
//# sourceMappingURL=user.js.map